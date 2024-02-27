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
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  //#########################
  // ngOnInit(): void {
  //   // 148688952528-vgrcn5eg1gtpfh8ki33mmg7m1t94iush.apps.googleusercontent.com
  //   google.accounts.id.initialize({
  //     client_id:
  //       '148688952528-vgrcn5eg1gtpfh8ki33mmg7m1t94iush.apps.googleusercontent.com',
  //     callback: (reponse: any) => this.handlelogin(reponse),
  //   });
  //   google.accounts.id.renderButton(document.getElementById('google-btn'), {
  //     size: 'large',
  //     theme: 'outline',
  //   });
  // }
  // private decodeToken(token: string) {
  //   return JSON.parse(atob(token.split('.')[1]));
  // }
  // handlelogin(response: any) {
  //   if (response) {
  //     const payload = this.decodeToken(response.credential);
  //     localStorage.setItem('_token', response.credential);
  //     this._Router.navigate(['/home']);
  //   }
  // }
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
