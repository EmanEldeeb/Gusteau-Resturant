declare var google: any;

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-googlelogin',
  standalone: true,
  imports: [SocialLoginModule],
  templateUrl: './googlelogin.component.html',
  styleUrl: './googlelogin.component.scss',
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('425599836554105'),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    SocialAuthService,
    AuthService,
  ],
})
export class GoogleloginComponent {
  user!: SocialUser;
  loggedIn!: boolean;
  isAuthenticated!: boolean;
  cart: {} = { items: [], totalPrice: 0 };
  constructor(
    private _Router: Router,
    private authService: SocialAuthService,
    private _AuthService: AuthService
  ) {}
  ngOnInit(): void {
    // 148688952528-vgrcn5eg1gtpfh8ki33mmg7m1t94iush.apps.googleusercontent.com
    google.accounts.id.initialize({
      client_id:
        '148688952528-vgrcn5eg1gtpfh8ki33mmg7m1t94iush.apps.googleusercontent.com',
      callback: (reponse: any) => this.handlelogin(reponse),
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      size: 'large',
      theme: 'outline',
    });
  }
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  handlelogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      localStorage.setItem('_token', response.credential);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.onRegistrationSuccess();
      this._Router.navigate(['/home']);
    }
    // facebook subscription
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  onRegistrationSuccess(): void {
    this._AuthService.setAuthenticationStatus(true);
  }
}
