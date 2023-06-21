import {UserDTO, UserAuthResponseDTO, CredentialsDTO} from '../dtos/userDto';
import AuthService from '../services/authService';

class AuthController {
  private service = new AuthService();

  public async register(user: UserDTO): Promise<UserAuthResponseDTO> {
    try {
      const message = await this.service.registerUser(user);

      return message;
    } catch (error) {
      return error as UserAuthResponseDTO;
    }
  }

  public async login(
    credentials: CredentialsDTO
  ): Promise<UserAuthResponseDTO> {
    try {
      const message = await this.service.login(credentials);

      return message;
    } catch (error) {
      return error as UserAuthResponseDTO;
    }
  }
}

export {AuthController};
