const path = require('path');
const debug = process.env.NODE_ENV !== 'production';
const PrerenderSpaPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer;

const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = [ 'js', 'css' ];

const autoBuildIndex = require('./.2o3t/bin/autoBuildIndex');
const loadLibs = [
    'components',
    'designs',
    'themes',
];
autoBuildIndex(loadLibs);

const aliasLibs = loadLibs.reduce((obj, item) => {
    obj[`@${item}`] = path.resolve(__dirname, `./src/${item}`);
    return obj;
}, {});
console.log(aliasLibs);

const customLoader = require('./.2o3t/loaders');

const PRODUCTION_BASE_URL = '/';

const vueConfig = {
    baseUrl: debug ? '/' : PRODUCTION_BASE_URL,
    outputDir: 'webs',
    configureWebpack: config => {
        // webpack配置，值位对象时会合并配置，为方法时会改写配置
        if (debug) { // 开发环境配置
            config.devtool = 'cheap-module-eval-source-map';
        } else { // 生产环境配置
            const externals = config.externals || {};
            Object.assign(config, {
                externals: Object.assign(externals, {
                    // 'highlight.js': 'hljs',
                    // 'markdown-it': 'markdownit',
                    // clipboard: 'clipboard-polyfill',
                    // vue: 'Vue',
                    // 'vue-router': 'VueRouter',
                    axios: 'axios',
                }),
            });

            // gzip
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8,
            }));
        }

        const resolve = config.resolve || {};
        const alias = resolve.alias || {};
        Object.assign(config.resolve, { // 开发生产共同配置
            alias: Object.assign(alias, {
                '@': path.resolve(__dirname, './src'),
                '@data': path.resolve(__dirname, './src/data'),
                '@router': path.resolve(__dirname, './src/router'),
                '@assets': path.resolve(__dirname, './src/assets'),
                '@views': path.resolve(__dirname, './src/views'),
                '@libs': path.resolve(__dirname, './libs'),
                vue$: 'vue/dist/vue.esm.js',
                ...aliasLibs,
            }),
            extensions: [ '.js', '.jsx', '.vue', '.json', '.css' ],
        });

        if (!debug) {
            config.plugins.push(new PrerenderSpaPlugin({
                // 将渲染的文件放到dist目录下
                staticDir: path.join(__dirname, './webs'),
                // 需要预渲染的路由信息
                routes: [ '/' ],
                renderer: new Renderer({// 这样写renderAfterTime生效了
                    renderAfterTime: 50000,
                    inject: {
                        foo: 'bar',
                    },
                    headless: false,
                    renderAfterDocumentEvent: 'render-event',
                }),
            }));
        }
    },
    chainWebpack: config => {
        customLoader(config);
    },
};

module.exports = vueConfig;
