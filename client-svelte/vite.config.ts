import { defineConfig } from "vite"
import { resolve } from "path"
import { svelte } from "@sveltejs/vite-plugin-svelte"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	build: {
		lib: {
			name: "global",
			entry: resolve(__dirname, "src/main.ts"),
			formats: ["iife"],
		},
	},
})
