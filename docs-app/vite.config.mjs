import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { kolay } from 'kolay/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    target: ['esnext'],
  },
  resolve: {
    extensions,
  },
  plugins: [
    classicEmberSupport(),
    ember(),
    // extra plugins here
    kolay({
      src: 'public/docs',
      groups: [],
      packages: ['ember-aria-tabs'],
    }),
    tailwindcss(),
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
  optimizeDeps: {
    // a wasm-providing dependency
    exclude: ['content-tag'],
    // for top-level-await, etc
    esbuildOptions: {
      target: 'esnext',
    },
  },
});
