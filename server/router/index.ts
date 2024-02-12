import { Router } from 'express';
import { appRoutes } from './app';
import { staticRoutes } from './static';
const router: Router = Router();

appRoutes(router);
staticRoutes(router);

export default router;
