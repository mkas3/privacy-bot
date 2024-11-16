import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/main.ts'
  ],
  format: ['esm'],
  minify: 'terser',
  outDir: 'dist',
  shims: true,
  treeshake: true
});
