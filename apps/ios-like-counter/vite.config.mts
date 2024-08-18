import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import styleX from 'vite-plugin-stylex';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react(), styleX()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts', // setupFiles를 통해 전역 설정
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: [...configDefaults.exclude, 'e2e/*'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
  },
});