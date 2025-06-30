import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
	plugins: [react()],
	envPrefix: 'VITE_',
	cacheDir: '.vite',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		outDir: 'build',
		rollupOptions: {
			treeshake: true,
		},
	},
})
