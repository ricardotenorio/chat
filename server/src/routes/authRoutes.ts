import {Router} from 'express';
import {AuthController} from '../controllers/authController';

const router = Router();
const controller = new AuthController();

router.post('/register', async (request, response) => {
  const {code, ...result} = await controller.register(request.body);

  response.status(code!).json(result);
});

router.post('/login', async (request, response) => {
  const {code, ...result} = await controller.login(request.body);

  response.status(code!).json(result);
});

export default router;
