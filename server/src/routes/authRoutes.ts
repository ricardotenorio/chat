import {Router} from 'express';
import {AuthController} from '../controllers/authController';

const router = Router();
const controller = new AuthController();

router.post('/register', async (request, response) => {
  const message = await controller.register(request.body);

  response.status(201).send(message);
});

router.post('/login', async (request, response) => {
  const message = await controller.login(request.body);

  response.status(200).json(message);
});

export default router;
