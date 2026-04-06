export interface RegisterFormValues {
  name:            string;
  surname:         string;
  email:           string;
  password:        string;
  confirmPassword?: string;
  phone_number:    string;
  country:         string;
  role:            string;
}

export type AuthMode = "login" | "register";

export interface CornerOrnamentProps {
  top?:    number | string;
  bottom?: number | string;
  left?:   number | string;
  right?:  number | string;
}

export interface LoginFormValues {
  email:    string;
  password: string;
}