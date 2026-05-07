export interface Student {
  created_at: string; 
  departament: string | null;

  stu_atesi: string;
  stu_dat_regjistrim: string; 
  stu_dl: string; 

  stu_em: string;
  stu_email: string;
  stu_gjini: string; 

  stu_id: string;
  stu_mb: string;
  stu_nuid: string;

  stu_status: string; 

  updated_at: string; 
}

export interface StudentPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  date_of_birth?: string;
  address?: string;
  enrollment_date: string;
  status?: "active" | "inactive" | "graduated";
}

export interface StudentResponse {
  success: boolean;
  message?: string;
  data: Student;
}

export interface StudentsResponse {
  success: boolean;
  data: Student[];
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}

