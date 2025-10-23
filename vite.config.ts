import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dts from 'vite-plugin-dts';
import pkg from './package.json' with { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const isExternalBuild = mode === 'external';

  return {
    build: {
      outDir: isExternalBuild ? 'dist/external' : 'dist/bundled',
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'LitFlow',
        formats: ['es', 'cjs', 'umd'],
        fileName: (format) => {
          const suffix = isExternalBuild ? '' : '.bundle';
          switch (format) {
            case 'es': return `lit-flow${suffix}.js`;
            case 'cjs': return `lit-flow${suffix}.cjs`;
            case 'umd': return `lit-flow${suffix}.umd.cjs`;
            default: return `lit-flow${suffix}.js`;
          }
        },
      },
      rollupOptions: {
        external: isExternalBuild
          ? [
              'lit',
              'lit/decorators.js',
              'lit/static-html.js',
              'lit/directives/style-map.js',
              ...Object.keys(pkg.dependencies || {}),
              ...Object.keys((pkg as any).peerDependencies || {}),
            ]
          : [],
        output: {
          globals: {
            'lit': 'Lit',
            'lit/decorators.js': 'LitDecorators',
            'lit/static-html.js': 'LitStaticHtml',
            'lit/directives/style-map.js': 'LitDirectives'
          }
        },
      },
      sourcemap: true,
      minify: !isExternalBuild,
    },
    plugins: isExternalBuild ? [
      dts({
        include: ['src/**/*'],
        rollupTypes: true,
        outDir: 'dist/external',
      }),
    ] : [],
  };
});

