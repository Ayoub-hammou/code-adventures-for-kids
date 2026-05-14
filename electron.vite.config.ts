import { defineConfig } from "electron-vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  main: {
    build: {
      lib: {
        entry: path.resolve(__dirname, "electron/main.js"),
      },
    },
  },

  renderer: {
    root: ".",
    build: {
      rollupOptions: {
        input: path.resolve(__dirname, "index.html"),
      },
    },
    plugins: [react()],
  },
});
