import {Request, Response, Router} from 'express';

import authRouter from './authRoutes';

const router = Router();

router.get('/', (request: Request, response: Response) => {
  response.send('Express + TypeScript Server');
});

router.use('/authentication', authRouter);

export default router;
