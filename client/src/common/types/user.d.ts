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
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
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
