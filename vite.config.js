import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';

dotenv.config(); // load env vars from .env

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    API_URL: `"${process.env.API_URL}"`,
  },
  plugins: [react()],
});
