import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-react-components/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    AutoImport({
      imports: ["react"],
    }),
    Components({
      dirs: ["src/components"],
      extensions: ["tsx"],
      deep: true,
      include: [/\.tsx$/, /\.jsx$/],
      dts: {
        global: true, 
      },
    } as any),
    ,
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
