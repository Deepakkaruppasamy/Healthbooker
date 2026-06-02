export interface Appointment {
  appointment_id: number;
  patient_id: number;
  doctor_id: number;
  appointment_date: string;
  appointment_time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  patient_name?: string;
  doctor_name?: string;
  specialization?: string;
} 