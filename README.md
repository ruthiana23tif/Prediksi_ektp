# eKTP Classifier — Panduan Setup Lengkap

Stack: **React + TensorFlow.js + Vite → deploy ke Vercel (gratis)**

---

## Alur Kerja

```
[Colab: Training MobileNetV2] → [Export .h5] → [Convert ke TFJS] → [Copy ke React] → [Deploy Vercel]
```

---

## Langkah 1 — Konversi Model di Colab

1. Buka Google Colab
2. Upload file `colab_convert_model.py` atau copy isinya ke notebook
3. Pastikan model `.h5` kamu sudah ada (hasil training)
4. Jalankan cell satu per satu
5. Download file `tfjs_model.zip` yang dihasilkan

---

## Langkah 2 — Setup Project React

```bash
# Clone atau download project ini
cd ektp-classifier

# Install dependencies
npm install

# Jalankan di local
npm run dev
```

---

## Langkah 3 — Taruh Model di Project

1. Extract `tfjs_model.zip`
2. Copy semua isinya ke folder `public/model/`

Struktur akhir:
```
public/
  model/
    model.json          ← wajib ada
    group1-shard1of1.bin  ← weights (bisa lebih dari 1 file)
```

---

## Langkah 4 — Sesuaikan Output Model

Buka `src/App.jsx`, cari bagian ini dan sesuaikan:

```js
// Kalau model pakai 1 neuron sigmoid (binary):
// output = [nilai_tunggal]  → 1 = asli, 0 = palsu
if (scores.length === 1) { ... }

// Kalau model pakai 2 neuron softmax:
// output = [prob_asli, prob_palsu]
// PASTIKAN urutan index sesuai dengan label saat training!
probAsli  = scores[0];  // ← sesuaikan jika perlu
probPalsu = scores[1];
```

---

## Langkah 5 — Deploy ke Vercel

```bash
# Install Vercel CLI (sekali saja)
npm install -g vercel

# Build project
npm run build

# Deploy
vercel

# Atau push ke GitHub, lalu connect repo di vercel.com (lebih mudah)
```

---

## Catatan Penting

- Model TFJS akan di-load dari `public/model/model.json`
- Model dijalankan di browser user — tidak butuh server
- MobileNetV2 yang dikonversi biasanya ~14MB, masih oke untuk web
- Input gambar di-resize otomatis ke 224×224 di kode React
- Vercel free tier cukup untuk hosting static files sampai 100MB

---

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| "Model tidak ditemukan" | Pastikan `public/model/model.json` ada |
| Hasil prediksi terbalik | Tukar index `scores[0]` dan `scores[1]` |
| Error CORS saat load model | Jalankan via `npm run dev`, bukan buka HTML langsung |
| Model terlalu besar (>100MB) | Gunakan quantization saat convert di Colab |

---

## Quantization (Opsional — kurangi ukuran model)

Tambahkan di Colab saat konversi:

```python
# Quantize ke float16 (ukuran ~setengahnya, akurasi hampir sama)
tfjs.converters.save_keras_model(
    model,
    OUTPUT_DIR,
    quantization_dtype_map={'float16': '*'}
)
```
