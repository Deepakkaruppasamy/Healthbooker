import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { AppointmentService } from '../../services/appointment.service';
import { Doctor } from '../../models/doctor.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  @ViewChild('appointmentModal') appointmentModal: TemplateRef<any>;
  
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  selectedSpecialty = '';
  specialties: string[] = [];
  minDate: string;
  
  selectedDoctor: Doctor | null = null;
  appointmentForm: FormGroup;
  appointmentError = '';
  appointmentSuccess = '';
  bookingInProgress = false;
  
  constructor(
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    
    // Initialize appointment form
    this.appointmentForm = this.formBuilder.group({
      appointment_date: ['', Validators.required],
      appointment_time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.loading = true;
    this.doctorService.getAllDoctors()
      .subscribe({
        next: (response) => {
          if (response.status) {
            this.doctors = response.data;
            this.filteredDoctors = [...this.doctors];
            
            // Extract unique specialties
            this.specialties = Array.from(new Set(this.doctors.map(doctor => doctor.specialization)));
            
            this.loading = false;
          } else {
            this.error = response.message || 'Error loading doctors';
            this.loading = false;
          }
        },
        error: error => {
          this.error = error.error?.message || 'Failed to load doctors';
          this.loading = false;
        }
      });
  }

  filterDoctors(): void {
    this.filteredDoctors = this.doctors.filter(doctor => {
      const matchesSearch = doctor.full_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           doctor.specialization.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           doctor.qualification.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesSpecialty = this.selectedSpecialty ? doctor.specialization === this.selectedSpecialty : true;
      
      return matchesSearch && matchesSpecialty;
    });
  }

  search(): void {
    this.filterDoctors();
  }

  onSpecialtyChange(): void {
    this.filterDoctors();
  }

  bookAppointment(doctorId: number): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: `/doctors` } });
      return;
    }
    
    // Find the selected doctor
    this.selectedDoctor = this.doctors.find(doctor => doctor.doctor_id === doctorId) || null;
    
    if (this.selectedDoctor) {
      // Reset form and errors
      this.appointmentForm.reset();
      this.appointmentError = '';
      this.appointmentSuccess = '';
      
      // Open modal
      this.modalService.open(this.appointmentModal, { centered: true });
    }
  }
  
  submitAppointment(): void {
    this.appointmentError = '';
    this.appointmentSuccess = '';
    
    if (this.appointmentForm.invalid) {
      this.appointmentError = 'Please select both date and time for your appointment';
      return;
    }
    
    if (!this.selectedDoctor || !this.authService.currentUserValue) {
      this.appointmentError = 'Something went wrong. Please try again.';
      return;
    }
    
    this.bookingInProgress = true;
    
    const appointmentData = {
      doctor_id: this.selectedDoctor.doctor_id,
      patient_id: this.authService.currentUserValue.user_id,
      appointment_date: this.appointmentForm.value.appointment_date,
      appointment_time: this.appointmentForm.value.appointment_time,
      status: 'scheduled'
    };
    
    this.appointmentService.createAppointment(appointmentData)
      .subscribe({
        next: (response) => {
          if (response.status) {
            this.appointmentSuccess = 'Appointment booked successfully!';
            this.bookingInProgress = false;
            
            // Close modal after a short delay
            setTimeout(() => {
              this.modalService.dismissAll();
              this.router.navigate(['/appointments']);
            }, 2000);
          } else {
            this.appointmentError = response.message || 'Failed to book appointment';
            this.bookingInProgress = false;
          }
        },
        error: (error) => {
          this.appointmentError = error.error?.message || 'Failed to book appointment';
          this.bookingInProgress = false;
        }
      });
  }
} 