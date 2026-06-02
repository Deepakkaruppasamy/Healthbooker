import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = false;
  error = '';

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      return;
    }

    this.loading = true;
    if (this.authService.isPatient()) {
      this.loadPatientAppointments(currentUser.user_id);
    } else if (this.authService.isDoctor()) {
      // Assuming there's a way to get the doctor_id from the user_id
      // This would require a backend endpoint or storing the doctor_id in the user object
      this.loadDoctorAppointments(currentUser.user_id);
    }
  }

  loadPatientAppointments(patientId: number): void {
    this.appointmentService.getAppointmentsByPatient(patientId)
      .subscribe({
        next: (response) => {
          if (response.status) {
            this.appointments = response.data;
            this.loading = false;
          } else {
            this.error = response.message || 'Failed to load appointments';
            this.loading = false;
          }
        },
        error: (error) => {
          this.error = error.error?.message || 'An error occurred while loading appointments';
          this.loading = false;
        }
      });
  }

  loadDoctorAppointments(doctorId: number): void {
    // This assumes there's a way to get the doctor_id from user_id
    // In a real app, you might store the doctor's ID in the user object or fetch it
    this.appointmentService.getAppointmentsByDoctor(doctorId)
      .subscribe({
        next: (response) => {
          if (response.status) {
            this.appointments = response.data;
            this.loading = false;
          } else {
            this.error = response.message || 'Failed to load appointments';
            this.loading = false;
          }
        },
        error: (error) => {
          this.error = error.error?.message || 'An error occurred while loading appointments';
          this.loading = false;
        }
      });
  }

  cancelAppointment(appointmentId: number): void {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.appointmentService.updateAppointment(appointmentId, { status: 'cancelled' })
        .subscribe({
          next: (response) => {
            if (response.status) {
              // Update the local appointment status
              const appointment = this.appointments.find(a => a.appointment_id === appointmentId);
              if (appointment) {
                appointment.status = 'cancelled';
              }
            } else {
              this.error = response.message || 'Failed to cancel appointment';
            }
          },
          error: (error) => {
            this.error = error.error?.message || 'An error occurred while cancelling the appointment';
          }
        });
    }
  }
} 