import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignupComponent {
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    const userData = { email: this.email, username: this.username, password: this.password };
    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('Inscription réussie:', response);
      },
      error: (error) => {
        console.error('Erreur lors de l\'inscription:', error);
      },
    });
  }
}
