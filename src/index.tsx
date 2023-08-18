import { Auth, Amplify } from 'aws-amplify';
// @ts-ignore
import awsconfig from './aws-exports';
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import './styles.scss';

library.add(fas);

// Configure Amplify with the aws-exports.js configuration
Amplify.configure(awsconfig);

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Root element not found!");
}
