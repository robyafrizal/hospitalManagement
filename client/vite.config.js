import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "unsafe-none", // added this part
    },
  },
  //CORS policy from Frontend Side
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:8080",
  //       secure: false,
  //     },
  //   },
  // },
});
