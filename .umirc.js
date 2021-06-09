import { defineConfig } from 'umi';
import routesConfig from './config/routes.config';

const { route } = routesConfig;

export default defineConfig({
  title: false,
  hash: true,
  favicon: '/assets/favicon.ico',
  dva: {},
  routes: [route],
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  define: {
    API_URL_PREFIX: process.env.API_URL_PREFIX,
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
