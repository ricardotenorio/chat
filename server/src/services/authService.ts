import bcrypt from 'bcryptjs';

import {UserDao} from '../daos/userDao';
import {UserDTO, UserAuthResponseDTO, CredentialsDTO} from '../dtos/userDto';

class AuthService {
  private userDao = new UserDao();

  public async registerUser(user: UserDTO): Promise<UserAuthResponseDTO> {
    const userExists = await this.userDao.checkIfAlreadyExists(user);

    if (userExists) {
      return {message: 'username/email already in use'};
    }

    const passwordHash = await this.hashPassword(user.password);

    if (!passwordHash) {
      return {message: 'server error'};
    }

    user.password = passwordHash;

    this.userDao.save(user);

    return {message: 'user created'};
  }

  public async login(
    credentials: CredentialsDTO
  ): Promise<UserAuthResponseDTO> {
    const user = await this.userDao.getByUsername(credentials.username);

    if (!user) {
      return {message: 'invalid username or password '};
    }

    const match = await bcrypt.compare(credentials.password, user.password);

    if (!match) {
      return {message: 'invalid username or password '};
    }

    return {message: 'login successful'};
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
