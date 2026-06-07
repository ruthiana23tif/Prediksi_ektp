import { createContext, useContext, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const ModelContext = createContext(null);

export function ModelProvider({ children }) {
  const [model, setModel] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function load() {
      try {
        console.log("Loading model...");
        const m = await tf.loadGraphModel("/model/model.json");
        console.log("✅ Model loaded:", m);
        setModel(m);
        setStatus("ready");
      } catch (err) {
        console.error("❌ Error loading model:", err);
        setStatus("error");
      }
    }
    load();
  }, []);

  return (
    <ModelContext.Provider value={{ model, status }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModel() {
  return useContext(ModelContext);
}