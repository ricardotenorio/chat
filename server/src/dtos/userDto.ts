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

interface UserAuthResponseDTO extends ResponseDTO {
  token?: string;
}

export {UserDTO, CredentialsDTO, UserAuthResponseDTO};
