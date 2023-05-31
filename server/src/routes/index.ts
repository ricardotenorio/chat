import {Request, Response, Router} from 'express';

const router = Router();

router.get('/', (request: Request, response: Response) => {
  response.send('Express + TypeScript Server');
});

export default router;
