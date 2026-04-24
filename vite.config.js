import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({  
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: { '@': path.resolve(__dirname, 'src'), },
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					react: ['react', 'react-dom', 'react-router'], // ← Splits React ecosystem
					query: ['@tanstack/react-query'], // ← Separates TanStack Query
					supabase: ['@supabase/supabase-js'], // ← Isolates Supabase
				}
			}
		},
		chunkSizeWarningLimit: 1000, // ← Suppresses warning for your bundle
	}
});