import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: "erp",
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 6000,
    },
    build: {
      chunkSizeWarningLimit: 2000, // Set the desired limit in kilobytes
    },
  };
});
