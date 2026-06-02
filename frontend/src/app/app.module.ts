import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ContactComponent } from './components/contact/contact.component';
import { ApplyDoctorComponent } from './components/apply-doctor/apply-doctor.component';

// Services
import { AuthService } from './services/auth.service';
import { DoctorService } from './services/doctor.service';
import { AppointmentService } from './services/appointment.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
  { path: 'apply-doctor', component: ApplyDoctorComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DoctorsComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    AppointmentsComponent,
    ProfileComponent,
    NotificationsComponent,
    ContactComponent,
    ApplyDoctorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers: [
    AuthService,
    DoctorService,
    AppointmentService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 