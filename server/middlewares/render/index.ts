import cfg from '../../../lib/cfg';
import render from './render';
import hot from './hot';

const isHot = cfg?.render?.isHot;
export default isHot ? hot : render;
