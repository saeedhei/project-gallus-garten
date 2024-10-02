// Original postcss.config.js (ESM):

import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default {
    plugins: [
        tailwindcss(),
        autoprefixer(),
    ],
};

// Converted postcss.config.cjs (CommonJS):

// const autoprefixer = require('autoprefixer');
// const tailwindcss = require('tailwindcss');

// module.exports = {
//     plugins: [
//         tailwindcss(),
//         autoprefixer(),
//     ],
// };


// If you're using Node.js 12 or later, add the following to your package.json file:
// add "type": "module",  in package.json

// For TS
// npm install ts-node @types/node --save-dev
// add in vite.config.ts
// import postcssConfig from './postcss.config.ts';
// export default defineConfig({
//   plugins: [tsconfigPaths()],
//   css: {
//     postcss: postcssConfig,
//   },
// });
// import autoprefixer from 'autoprefixer';
// import tailwindcss from 'tailwindcss';

// const config = {
//     plugins: [
//         tailwindcss(),
//         autoprefixer(),
//     ],
// };

// export default config;

