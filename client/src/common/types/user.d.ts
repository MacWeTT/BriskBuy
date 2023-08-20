/* Interface for User.
 * Provided by the DjangoRestFramework used in the backend */

export interface UserState {
  user: User;
  access_token: string;
  refresh_token: string;
  isLoggedIn: boolean;
}

export interface User {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface Credentials {
  email: string;
  password: string;
}
