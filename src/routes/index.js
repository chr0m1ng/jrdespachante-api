import { Router } from 'express';
import getRoutes from './routes';

const router = Router();
const routes = getRoutes();

routes.forEach((route) => {
    router[route.method](route.path, route.middlewares, route.controller);
});

export default router;
