import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/six-months/', // Use your repo name here
  plugins: [react()],
});
