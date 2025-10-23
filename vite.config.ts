import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LitFlow',
      fileName: (format) => {
        switch (format) {
          case 'es': return 'lit-flow.js';
          case 'cjs': return 'lit-flow.cjs';
          case 'umd': return 'lit-flow.umd.cjs';
          default: return 'lit-flow.js';
        }
      },
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: [],
      output: {},
    },
  },
  plugins: [
    dts({
      include: ['src/**/*'],
      rollupTypes: true,
    }),
  ],
});

