import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.email && this.password) {
      this.authService.login({ email: this.email, password: this.password }).subscribe({
        next: (response:any) => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.token); // Save the token (if provided)
          alert('Login successful!');
          this.router.navigate(['/dashboard']); // Navigate to a different page after login
        },
        error: (err:any) => {
          console.error('Login failed:', err);
          alert('Invalid email or password. Please try again.');
        },
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
