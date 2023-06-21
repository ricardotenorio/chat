import {ResponseDTO} from './responseDto';

interface UserDTO {
  username: string;
  email: string;
  password: string;
}

interface CredentialsDTO {
  username: string;
  password: string;
}

interface AuthDataDTO {
  username: string;
  email: string;
  token: string;
}

interface UserAuthResponseDTO extends ResponseDTO {
  data?: AuthDataDTO;
}

export {UserDTO, CredentialsDTO, UserAuthResponseDTO, AuthDataDTO};
