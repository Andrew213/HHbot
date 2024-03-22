import { Router } from 'express';
import { appRoutes } from './app';
import { staticRoutes } from './static';
import { sessionRouter } from './session';
import { userRouter } from './api/user/userRouter';
import { vacanciesRouter } from './api/vacancies/vacanciesRouter';
const router: Router = Router();

vacanciesRouter(router);
sessionRouter(router);
userRouter(router);
appRoutes(router);
staticRoutes(router);

export default router;
