import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/~sakariho/wsk-routing/', // <-- replace with your username
});
