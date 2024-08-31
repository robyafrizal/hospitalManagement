import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
