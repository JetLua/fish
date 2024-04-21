import {defineConfig} from 'vite'
import {resolve} from 'node:path'
import replace from '@rollup/plugin-replace'

export default defineConfig({
	resolve: {
		alias: {
			'@': resolve('.'),
			'~': resolve('src'),
		}
	},

	build: {
		minify: 'esbuild',
		emptyOutDir: false,
		outDir: 'dist/context',
		lib: {
			entry: [resolve('src/context.ts')],
			formats: ['cjs'],
			fileName: () => 'index.js'
		}
	},

	plugins: [
    replace({
      preventAssignment: false,
      'process.env.NODE_ENV': JSON.stringify('production')
    })
	]
})
