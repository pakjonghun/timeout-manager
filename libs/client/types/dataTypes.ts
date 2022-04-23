export type LoginRequest = {
  email?: string;
  phone?: string;
};

type AuthEmail = {
  authNumber: number;
  phone?: string;
  email: string;
};

type AuthPhone = {
  authNumber: number;
  phone: string;
  email?: string;
};

export type AuthRequest = AuthEmail | AuthPhone;

export type JoinRequest = {
  name: string;
  email: string;
  phone: string;
};
