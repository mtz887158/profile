import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base "./" works on GitHub Pages for any repo name
export default defineConfig({ base: './', plugins: [react()] })
