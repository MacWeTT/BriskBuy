/* Interface for User.
 * Provided by the DjangoRestFramework used in the backend */

export interface UserState {
  user: User;
  shipping_address: ShippingAddress;
  access_token: string;
  refresh_token: string;
  isLoggedIn: boolean;
}

export interface ShippingAddress {
  id: number;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
}

export interface User {
  pk: number;
  username: string;
  email: string;
  name: string;
  verified: boolean;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface JWT {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  username: string;
  name: string;
  email: string;
  isVerified: boolean;
}
