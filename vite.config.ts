import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://maps.googleapis.com',  // The API you're trying to access
        changeOrigin: true, // Change the origin of the host header to the target URL
        secure: false, // Disable SSL verification if needed (for local dev)
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove the /api prefix when sending requests
      },
      '/geo': {
        target: 'https://www.googleapis.com',  // The API you're trying to access
        changeOrigin: true, // Change the origin of the host header to the target URL
        secure: false, // Disable SSL verification if needed (for local dev)
        rewrite: (path) => path.replace(/^\/geo/, ''), // Remove the /api prefix when sending requests
      },
    },
  },
});
