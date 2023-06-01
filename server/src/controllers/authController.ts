import {UserDTO, UserAuthResponseDTO, CredentialsDTO} from '../dtos/userDto';
import AuthService from '../services/authService';

class AuthController {
  private service = new AuthService();

  public async register(user: UserDTO): Promise<UserAuthResponseDTO> {
    try {
      const message = this.service.registerUser(user);

      return message;
    } catch (error) {
      return {message: 'internal server error'};
    }
  }

  public async login(
    credentials: CredentialsDTO
  ): Promise<UserAuthResponseDTO> {
    try {
      const message = this.service.login(credentials);

      return message;
    } catch (error) {
      return {message: 'internal server error'};
    }
  }
}

export {AuthController};
