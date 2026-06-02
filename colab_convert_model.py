# ============================================================
# COLAB: Konversi Model MobileNetV2 ke TensorFlow.js
# Jalankan cell ini di Google Colab setelah training selesai
# ============================================================

# ── CELL 1: Install library yang dibutuhkan ──────────────────
!pip install tensorflowjs -q

# ── CELL 2: Import ──────────────────────────────────────────
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import layers, models
import tensorflowjs as tfjs
import os

# ── CELL 3: (OPSIONAL) Buat model dari scratch jika belum ada
# Skip cell ini kalau kamu sudah punya model .h5 dari training
def build_model(num_classes=2):
    base = MobileNetV2(
        input_shape=(224, 224, 3),
        include_top=False,
        weights='imagenet'
    )
    base.trainable = False  # freeze base dulu

    model = models.Sequential([
        base,
        layers.GlobalAveragePooling2D(),
        layers.Dropout(0.3),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.2),
        # num_classes=2: gunakan softmax (output: [prob_asli, prob_palsu])
        # num_classes=1: gunakan sigmoid (output: 1 nilai, 1=asli, 0=palsu)
        layers.Dense(num_classes, activation='softmax')
    ])
    return model

# model = build_model(num_classes=2)
# model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
# model.summary()

# ── CELL 4: Load model yang sudah ditraining (.h5) ──────────
# Ganti path ini sesuai lokasi model kamu
MODEL_PATH = '/content/ektp_model.h5'   # atau path lain
model = tf.keras.models.load_model(MODEL_PATH)
model.summary()

# ── CELL 5: Konversi ke TensorFlow.js ───────────────────────
OUTPUT_DIR = '/content/tfjs_model'
os.makedirs(OUTPUT_DIR, exist_ok=True)

tfjs.converters.save_keras_model(model, OUTPUT_DIR)
print(f"✅ Model berhasil dikonversi ke: {OUTPUT_DIR}")
print("File yang dihasilkan:")
for f in os.listdir(OUTPUT_DIR):
    size = os.path.getsize(f"{OUTPUT_DIR}/{f}") / 1024
    print(f"  {f} ({size:.1f} KB)")

# ── CELL 6: Download model ke komputer ──────────────────────
import shutil
from google.colab import files

# Zip semua file model
shutil.make_archive('/content/tfjs_model', 'zip', OUTPUT_DIR)
files.download('/content/tfjs_model.zip')
print("📦 Download dimulai...")

# ── CELL 7: Cek prediksi model (opsional, untuk verifikasi) ──
import numpy as np

def predict_test(model, img_array):
    """
    img_array: numpy array shape (224, 224, 3), nilai 0-255
    """
    img = img_array.astype('float32') / 255.0
    img = np.expand_dims(img, axis=0)
    pred = model.predict(img)
    print("Raw output:", pred)

    if pred.shape[-1] == 1:
        # Sigmoid
        prob_asli = float(pred[0][0])
        prob_palsu = 1 - prob_asli
    else:
        # Softmax — sesuaikan index dengan label waktu training
        prob_asli  = float(pred[0][0])
        prob_palsu = float(pred[0][1])

    print(f"Probabilitas ASLI : {prob_asli*100:.1f}%")
    print(f"Probabilitas PALSU: {prob_palsu*100:.1f}%")
    print(f"Prediksi: {'ASLI' if prob_asli >= 0.5 else 'PALSU'}")

# Contoh pakai gambar acak (ganti dengan gambar asli untuk tes)
# dummy = np.random.randint(0, 255, (224, 224, 3), dtype=np.uint8)
# predict_test(model, dummy)

# ============================================================
# CARA PAKAI HASIL KONVERSI DI REACT:
# 1. Extract tfjs_model.zip
# 2. Copy semua isinya ke folder: public/model/ di project React
# 3. Struktur akhir:
#    public/
#      model/
#        model.json        ← file utama
#        group1-shard1of1.bin  ← weights
# ============================================================
