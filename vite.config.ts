import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import 'dotenv/config';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const { VITE_NODE_ENV } = process.env;

  return defineConfig({
    mode: VITE_NODE_ENV,
    plugins: [react()],
    resolve: {
      alias: {
        '@root': path.resolve(__dirname, './src'),
        '@app': path.resolve(__dirname, './src/app'),
        '@store': path.resolve(__dirname, './src/app/store'),
        '@features': path.resolve(__dirname, './src/features'),
        '@routes': path.resolve(__dirname, './src/app/routes'),
        '@shared': path.resolve(__dirname, './src/shared'),
        '@entities': path.resolve(__dirname, './src/entities'),
        '@pages': path.resolve(__dirname, './src/pages'),
      },
    },
  });
};
