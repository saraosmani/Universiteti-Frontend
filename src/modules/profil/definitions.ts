export interface Student {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface StudentPayload {
  name: string;
  email: string;
  password: string;
}

export interface StudentResponse {
  success: boolean;
  data: {
    data: Student;
  };
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}