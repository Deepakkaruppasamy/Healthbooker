export interface User {
  user_id: number;
  username: string;
  email: string;
  full_name: string;
  user_type: 'patient' | 'doctor' | 'admin';
  phone_number?: string;
  date_of_birth?: string;
}

export interface AuthResponse {
  status: boolean;
  message: string;
  data?: {
    user_id: number;
    username: string;
    email: string;
    full_name: string;
    user_type: string;
  };
} 