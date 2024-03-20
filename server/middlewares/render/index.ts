import cfg from '../../../lib/cfg';
// import render from './render';
// import hot from './hot';
console.log('\n\n\n INSIDE1 server/middlewares/render/index.ts', cfg);

export default cfg.default.render && cfg.default.render.isHot
    ? require('./hot').default
    : require('./render').default;
