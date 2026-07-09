import Check from "./pages/Check";
import { ModelProvider } from "./hooks/useModel.jsx";
import "./App.css";

export default function App() {
  return (
    <ModelProvider>
      <div className="app-shell">
        <Check />
      </div>
    </ModelProvider>
  );
}
