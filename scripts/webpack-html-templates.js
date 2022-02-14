const HTMLWebpackPlugin = require('html-webpack-plugin');
const NodeFsFiles = require('./node-fs-files');

const WebpackHtmlTemplates = NodeFsFiles(`./src/components`, 'html');

const isWin32 = process.platform === 'win32' ? '\\' : '/';

const WebpackHtmlExamples = WebpackHtmlTemplates.map((template) => {

  const chunkArray = template.split(isWin32);
  chunkArray.splice(0, 2);
  const chunkName = chunkArray[0];
  const chunkFileNameArray = template.split(isWin32);
  const chunkFileName = chunkFileNameArray.slice(-1)[0];
  const title = `${chunkName.split('-').map((word) =>
    `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`).join(' ').replace('Ids ', 'IDS ')} Component`;

  return new HTMLWebpackPlugin({

    template: `./${template}`,

    title,

    filename: `${chunkName}/${chunkFileName}`,

    chunks: [chunkName], //'ids-container', 'ids-text', 'ids-icon', 'ids-layout-grid', 'ids-theme-switcher'

    // js: {
    //   meta: '/js/head-meta.js',
    //   metaNoCsp: '/js/head-meta-no-csp.js'
    // },

    favicon: './demos/assets/favicon.ico',

  });

});

module.exports = WebpackHtmlExamples;
