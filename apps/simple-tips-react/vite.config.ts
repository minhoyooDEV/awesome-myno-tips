import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import stylexPlugin from "@stylexjs/rollup-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    stylexPlugin({
      // Required. File path for the generated CSS file.
      fileName: "./.build/stylex.css",
      // default: false
      dev: process.env.NODE_ENV === 'development',
      // prefix for all generated classNames
      classNamePrefix: "x",
      // Required for CSS variable support
      unstable_moduleResolution: {
        // type: 'commonJS' | 'haste'
        // default: 'commonJS'
        type: "commonJS",
        // The absolute path to the root directory of your project
        rootDir: __dirname,
      },
    }),
  ],
});
