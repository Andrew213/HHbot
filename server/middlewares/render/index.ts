import cfg from '../../../lib/cfg';
import render from './render';
import hot from './hot';
console.log('\n\n\n INSIDE1 server/middlewares/render/index.ts', cfg);

const selectedExport = cfg.default.render?.isHot ? hot : render;

export default selectedExport;
