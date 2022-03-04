import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import includePaths from 'rollup-plugin-includepaths'
import external from 'rollup-plugin-peer-deps-external'
import typescript from 'rollup-plugin-typescript2'
import url from 'rollup-plugin-url'

import packageJson from './package.json'

export default {
  external: [],
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    url(),
    json(),
    typescript(),
    includePaths({
      paths: ['src'],
    }),
    resolve(),
    commonjs(),
  ],
}
