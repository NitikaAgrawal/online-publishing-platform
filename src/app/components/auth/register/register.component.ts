import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registrationError: string | null = null;
  isRegistering = false;

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isRegistering = true;
      this.registrationError = null;
      
      const { name, email, password } = this.registerForm.value;
      
      if (name && email && password) {
        const success = this.authService.register({ name, email, password });
        
        if (success) {
          this.router.navigate(['/login']);
        } else {
          this.registrationError = 'Registration failed. Please try again.';
        }
      }
      this.isRegistering = false;
    }
  }
}