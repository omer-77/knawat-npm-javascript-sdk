const path = require('path');
const babel = require('rollup-plugin-babel');
const version = process.env.VERSION || require('../package.json').version;

const paths = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  outputFolder: path.join(__dirname, '../dist'),
};

const common = {
  name: 'mp',
  input: path.join(paths.src, 'index.js'),
  uglifyOptions: {
    toplevel: true,
    compress: true,
    mangle: true,
  },
  banner: `/**
  * Knawat MP ${version}
  * (c) ${new Date().getFullYear()}
    * @license MIT
    */`,
  plugins: [babel()],
};
const builds = {
  umd: {
    format: 'umd',
    name: 'MP',
    ext: '',
  },
  esm: {
    format: 'es',
    ext: '.esm',
  },
};

function getConfig(key) {
  const build = builds[key];
  const config = {
    ...build,
    input: {
      input: build.input || common.input,
      plugins: build.plugins || common.plugins,
      external: ['node-fetch', 'qs'],
    },
    output: {
      name: build.name || common.name,
      banner: common.banner,
      format: build.format,
      globals: {
        'node-fetch': 'fetch',
        qs: 'qs',
      },
      exports: 'named',
    },
  };
  return config;
}

const configs = Object.keys(builds).reduce((acc, build) => {
  acc[build] = getConfig(build);
  return acc;
}, {});

module.exports = {
  paths,
  configs,
  common,
};
