import { Router } from 'express';
import { appRoutes } from './app';
import { staticRoutes } from './static';
import { sessionRouter } from './session';
import { userRouter } from './api/user/userRouter';
const router: Router = Router();

sessionRouter(router);
userRouter(router);
appRoutes(router);
staticRoutes(router);

export default router;
