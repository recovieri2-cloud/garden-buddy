import React from 'react';
import { createRoot } from 'react-dom/client';
import GardenBuddy from '../garden-buddy(Extended).jsx';
import './index.css';

// Polyfill window.storage (Claude Artifacts API) using localStorage so the
// app works in a regular browser. Must run before render() because the app
// calls window.storage.get() inside its mount-time useEffect.
if (!window.storage) {
  window.storage = {
    get: async (key) => {
      const value = localStorage.getItem(key);
      return value === null ? null : { value };
    },
    set: async (key, value) => {
      localStorage.setItem(key, value);
    },
    delete: async (key) => {
      localStorage.removeItem(key);
    },
  };
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GardenBuddy />
  </React.StrictMode>,
);
