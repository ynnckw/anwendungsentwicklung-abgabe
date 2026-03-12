import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'], // erzeugt Coverage für Konsole, lcov und HTML
    },
  },
  resolve: {
    alias: {
      '@webanwendung/shared': path.resolve(__dirname, '../../packages/shared/src/index.ts'),
    },
  },
});