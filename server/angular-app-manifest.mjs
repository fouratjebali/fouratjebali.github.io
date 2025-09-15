
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://fouratjebali.github.io/fouratjebali.github.io/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/fouratjebali.github.io"
  },
  {
    "renderMode": 2,
    "route": "/fouratjebali.github.io/about"
  },
  {
    "renderMode": 2,
    "route": "/fouratjebali.github.io/experience"
  },
  {
    "renderMode": 2,
    "route": "/fouratjebali.github.io/projects"
  },
  {
    "renderMode": 2,
    "route": "/fouratjebali.github.io/contact"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24850, hash: 'b91eed62e7592f39d0cdd19b6ce562d6b5a3e2146d561fd9ab441c44aa81ed8a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17275, hash: '6ae66dc46c4dd60ad3cf38a3047386248f2b1a2332873f8b90ea2f9d3bf58062', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'experience/index.html': {size: 56718, hash: '439d748e480da2504b0077cda7177f92863fc38d0ce2545d2a9a67b7ceb2df81', text: () => import('./assets-chunks/experience_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 58646, hash: 'f623be43df6aeed5c3ab88cf041afb6791de11ab2660f25c9a3d6eae25861a28', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 58131, hash: '9c88036a41b3e0da67b10b0f5e0c6ac6d264017e74fc09860e8a3f5f086073cc', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'projects/index.html': {size: 114416, hash: 'e40aa830fb98997429f791a2eb1344c06ce04094fbadcab4097f2db82d4675de', text: () => import('./assets-chunks/projects_index_html.mjs').then(m => m.default)},
    'index.html': {size: 165805, hash: 'aef58484b91215fd0c10d94b56efdc162c8247678e0ff3e56173eca44237b0c0', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-ZQKT2OPC.css': {size: 8128, hash: '9Zdd6YQjVRs', text: () => import('./assets-chunks/styles-ZQKT2OPC_css.mjs').then(m => m.default)}
  },
};
