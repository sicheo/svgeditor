//import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { UserConfig } from 'vite'


/*
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
})*/

const config: UserConfig = {
	plugins: [svelte()],
	optimizeDeps: { include: ["@carbon/charts", "svelte-pdf"], exclude: ['@carbon/telemetry'] },
	server: {
		port:8080
	}
};

export default config;

