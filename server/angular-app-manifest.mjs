
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/about"
  },
  {
    "renderMode": 2,
    "route": "/experience"
  },
  {
    "renderMode": 2,
    "route": "/projects"
  },
  {
    "renderMode": 2,
    "route": "/contact"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24797, hash: 'b19bb966d5253989358c5a2d54e5933fda7807ed7621c7aaa4527a80a09e23ea', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17222, hash: 'ebdffca557ff460ebd7348e5b1ae8239e692940b1487acbe81fc7f7c5223f407', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'experience/index.html': {size: 56453, hash: '5b294242982c76c42f79eb8642296af9b8e6a88fc909bd10c8ef8b8df4de30af', text: () => import('./assets-chunks/experience_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 57813, hash: '038a74e745d2387e35006e7064a459cf3874019a939237218523fb10cd908ca0', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 58381, hash: '880618ad3b0f97f5fff43e730e83081e11b207ebc63bd52cfb56307103e22763', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'projects/index.html': {size: 114151, hash: 'e98caea87e7ae89173505b556296704f91c69db3e682f636f88481d2b16044d5', text: () => import('./assets-chunks/projects_index_html.mjs').then(m => m.default)},
    'index.html': {size: 165487, hash: 'a551d41966370a3477f299ff229400a31a5175d08b05cd594449aac4adbe9789', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-ZQKT2OPC.css': {size: 8128, hash: '9Zdd6YQjVRs', text: () => import('./assets-chunks/styles-ZQKT2OPC_css.mjs').then(m => m.default)}
  },
};
