import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginData = {
    email: '',
    password: ''
  };
  
  registerData = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  
  isLoginMode = true;
  loading = false;
  error = '';

  constructor(
    private authService: FirebaseAuthService,
    private router: Router
  ) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = '';
  }

  async signInWithGoogle() {
    this.loading = true;
    this.error = '';
    try {
      await this.authService.signInWithGoogle();
      this.loading = false;
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.loading = false;
      this.error = this.getFirebaseErrorMessage(error.code) || 'Google sign-in failed. Please try again.';
    }
  }

  async onLogin() {
    this.loading = true;
    this.error = '';

    try {
      await this.authService.login(this.loginData.email, this.loginData.password);
      this.loading = false;
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.loading = false;
      this.error = this.getFirebaseErrorMessage(error.code) || 'Login failed. Please try again.';
    }
  }

  async onRegister() {
    this.loading = true;
    this.error = '';

    try {
      await this.authService.register(this.registerData.email, this.registerData.password);
      this.loading = false;
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.loading = false;
      this.error = this.getFirebaseErrorMessage(error.code) || 'Registration failed. Please try again.';
    }
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.onLogin();
    } else {
      this.onRegister();
    }
  }

  private getFirebaseErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No user found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return 'An error occurred. Please try again.';
    }
  }
}
