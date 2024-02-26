declare var google: any;
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  loginerror: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  //#########################
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: 'YOUR_GOOGLE_CLIENT_ID',
      callback: (reponse: any) => {},
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      size: 'large',
      theme: 'outline',
    });
  }
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
          localStorage.setItem('_token', response.token);
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
}
