import bcrypt from 'bcryptjs';

import {UserDao} from '../daos/userDao';
import {
  UserDTO,
  UserAuthResponseDTO,
  CredentialsDTO,
  AuthDataDTO,
} from '../dtos/userDto';
import {createToken} from '../utils/JWTToken';

class AuthService {
  private userDao = new UserDao();

  public async registerUser(user: UserDTO): Promise<UserAuthResponseDTO> {
    try {
      const userExists = await this.userDao.checkIfAlreadyExists(user);

      if (userExists) {
        return {message: 'username/email already in use', code: 400};
      }

      const passwordHash = await this.hashPassword(user.password);

      if (!passwordHash) {
        return {message: 'server error', code: 500};
      }

      user.password = passwordHash;

      this.userDao.save(user);

      const token = createToken({username: user.username, email: user.email});

      const data: AuthDataDTO = {
        username: user.username,
        email: user.email,
        token,
      };

      return {message: 'user created', code: 201, data};
    } catch (error) {
      return {message: 'internal server error', code: 500};
    }
  }

  public async login(
    credentials: CredentialsDTO
  ): Promise<UserAuthResponseDTO> {
    try {
      const user = await this.userDao.getByUsername(credentials.username);

      if (!user) {
        return {message: 'invalid username or password', code: 400};
      }

      const match = await bcrypt.compare(credentials.password, user.password);

      if (!match) {
        return {message: 'invalid username or password', code: 400};
      }

      const token = createToken({username: user.username, email: user.email});

      const data: AuthDataDTO = {
        username: user.username,
        email: user.email,
        token,
      };

      return {message: 'login successful', code: 200, data};
    } catch (error) {
      return {message: 'internal server error', code: 500};
    }
  }

  private async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      return passwordHash;
    } catch (error) {
      console.log(error);

      return '';
    }
  }
}

export default AuthService;
