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
  ],
})
export class GoogleloginComponent {
  user!: SocialUser;
  loggedIn!: boolean;
  constructor(
    private _Router: Router,
    private authService: SocialAuthService
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
      type: 'icon',
    });
  }
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  handlelogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      localStorage.setItem('_token', response.credential);
      this._Router.navigate(['/home']);
    }
    // facebook subscription
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }
  // facebook login
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
