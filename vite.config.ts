import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  const server = env.CONTAINERIZED ? { host: '0.0.0.0' } : {};
  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    plugins: [react()],
    server: server,
  };
});
