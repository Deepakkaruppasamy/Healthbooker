import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  error = '';
  success = '';
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.pattern('^[0-9]{10}$')],
      date_of_birth: ['']
    }, {
      validator: this.checkPasswords
    });
  }

  ngOnInit(): void {
  }

  // Custom validator to check if passwords match
  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    
    return password === confirmPassword ? null : { notMatching: true };
  }

  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    
    // Reset alerts
    this.error = '';
    this.success = '';

    // Stop if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    
    // Create user data object
    const userData = {
      username: this.f['username'].value,
      password: this.f['password'].value,
      email: this.f['email'].value,
      full_name: this.f['full_name'].value,
      phone_number: this.f['phone_number'].value,
      date_of_birth: this.f['date_of_birth'].value,
      user_type: 'patient' // Default user type
    };

    this.authService.register(userData)
      .subscribe({
        next: (response) => {
          if (response.status) {
            this.success = 'Registration successful. Please login.';
            this.loading = false;
            
            // Redirect to login after a short delay
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else {
            this.error = response.message || 'Registration failed';
            this.loading = false;
          }
        },
        error: error => {
          this.error = error.error.message || 'Registration failed';
          this.loading = false;
        }
      });
  }
} 