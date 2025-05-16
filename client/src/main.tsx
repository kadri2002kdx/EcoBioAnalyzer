import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import * as tf from "@tensorflow/tfjs";

// Initialize TensorFlow.js
async function initialize() {
  // Wait for TensorFlow.js to be ready
  await tf.ready();
  console.log("TensorFlow.js initialized");
  
  // Mount the app
  createRoot(document.getElementById("root")!).render(<App />);
}

// Initialize the app
initialize();
