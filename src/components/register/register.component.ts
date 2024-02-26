import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  loading: boolean = false;
  registerError: boolean = false;
  errorMessage: string = '';
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[01245]\d{8}$/),
    ]),
  });
  sentUserDataToServer() {
    const value = this.registerForm.value;
    if (this.registerForm.valid) {
      this.loading = true;
      this._AuthService.postUserDataToServer(value).subscribe({
        next: (response) => {
          this._Router.navigate(['/login']);
          this.loading = false;
          this.registerError = false;
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
          this.loading = false;
          this.registerError = true;
        },
      });
    }
  }
}
