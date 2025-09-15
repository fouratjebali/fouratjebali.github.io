
export default {
  basePath: 'https://fouratjebali.github.io/fouratjebali.github.io',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
