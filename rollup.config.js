import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import includePaths from 'rollup-plugin-includepaths'
import { terser } from 'rollup-plugin-terser'
import url from 'rollup-plugin-url'
import { visualizer } from 'rollup-plugin-visualizer'
import ts from 'rollup-plugin-ts'

import packageJson from './package.json'

export default {
  external: [...Object.keys(packageJson.dependencies)],
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    includePaths({
      paths: ['src'],
    }),
    url(),
    resolve(),
    commonjs(),
    json(),
    ts({}),
    visualizer(),
    terser(),
  ],
}
