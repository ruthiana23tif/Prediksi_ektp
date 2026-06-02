import { createContext, useContext, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const ModelContext = createContext(null);

export function ModelProvider({ children }) {
  const [model, setModel] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    tf.loadLayersModel("/model/model.json")
      .then((m) => { setModel(m); setStatus("ready"); })
      .catch(() => setStatus("error"));
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