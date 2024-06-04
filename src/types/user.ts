export interface User {
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
}

export interface UserWithId extends User {
  id: number;
}
