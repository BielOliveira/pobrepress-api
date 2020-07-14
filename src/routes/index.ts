import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import permissionsRouter from './permissions.routes';
import mediasRoute from './medias.routes';
import blogCategoryRoute from './blog.category.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/permissions', permissionsRouter);
routes.use('/medias', mediasRoute);
routes.use('/blog/category/', blogCategoryRoute);

export default routes;
