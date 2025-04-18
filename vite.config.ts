import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/leetcode-226-invert-binary-tree/',
  plugins: [react()],
})
