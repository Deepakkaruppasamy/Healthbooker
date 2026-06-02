import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllAppointments(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/appointments`);
  }

  getAppointmentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/appointments/${id}`);
  }

  getAppointmentsByPatient(patientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/appointments/patient/${patientId}`);
  }

  getAppointmentsByDoctor(doctorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/appointments/doctor/${doctorId}`);
  }

  createAppointment(appointment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/appointments`, appointment);
  }

  updateAppointment(id: number, appointment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/appointments/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/appointments/${id}`);
  }
} 