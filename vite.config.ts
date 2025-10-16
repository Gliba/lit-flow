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
      fileName: (format) => format === 'es' ? 'lit-flow.js' : 'lit-flow.umd.cjs',
      formats: ['es', 'umd'],
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

