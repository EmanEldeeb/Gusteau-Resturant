// declare var google: any;
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleloginComponent } from '../googlelogin/googlelogin.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    GoogleloginComponent,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loading: boolean = false;
  loginerror: boolean = false;
  // handle cart
  cart: {} = { items: [], totalPrice: 0 };

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  //#########################
  // ngOnInit(): void {}
  // ############################
  LoginForm: FormGroup = new FormGroup({
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
  });
  sentUserDataToServer() {
    let value = this.LoginForm.value;
    console.log(this.LoginForm);
    delete value['name'];
    console.log(value);
    if (this.LoginForm.valid) {
      this.loading = true;
      this._AuthService.postLoginRequest(value).subscribe({
        next: (response) => {
          this.loading = false;
          this.loginerror = false;
          console.log(response);
          localStorage.setItem('cart', JSON.stringify(this.cart));
          localStorage.setItem('_token', response.token);
          this.onRegistrationSuccess();
          this._Router.navigate(['/home']);
        },
        error: (err) => {
          this.loginerror = true;
          this.loading = false;
          console.log('err', err, this.loading);
        },
      });
    }
  }
  // subsribe to isAuthenticated to change layout of navbar after login
  onRegistrationSuccess(): void {
    console.log('successs login');
    // Notify the shared service that the user is authenticated
    this._AuthService.setAuthenticationStatus(true);
  }
}
