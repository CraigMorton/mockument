const rollup = require('rollup')
const pkg = require('../package.json')
const del = require('del')

const babel = require('rollup-plugin-babel')

const bundles = [
  {
    format: 'es',
    dest: pkg.module,
    plugins: []
  },
  {
    format: 'cjs',
    dest: pkg.main,
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        sourceMaps: true,
        plugins: [
          'external-helpers',
        ],
        presets: [
          ['es2015', {modules: false}]
        ],
      }),
    ]
  },
]

const plugins = []

function supressWarnings(supressed, cb) {
  return function (warning) {
    if (supressed.indexOf(warning.code) === -1) {
      if (cb != null) cb(warning)
      else console.log(warning.message)
    }
  }
}

function logWarningCodes(warning) {
  console.log(warning.code)
  console.log(warning.message)
}

const externalPackages = Object.keys(pkg.dependencies || {})
  .concat(Object.keys(pkg.peerDependencies || {}))
  .concat(Object.keys(pkg.devDependencies || {}))
  .concat(['fs'])

let promise = Promise.resolve()
promise = promise.then(() => del(['dist/']))

for (const config of bundles) {
  promise = promise.then(() => rollup.rollup({
    entry: 'src/index.js',
    external: externalPackages,
    plugins: config.plugins.concat(plugins),
    onwarn: logWarningCodes
  }))
  .then(bundle => bundle.write({
    dest: config.dest,
    format: config.format,
    moduleName: config.moduleName,
    sourceMap: false,
  }))
}

promise.catch((err) => console.error(err.stack))
