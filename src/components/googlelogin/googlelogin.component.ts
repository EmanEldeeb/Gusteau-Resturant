declare var google: any;

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-googlelogin',
  standalone: true,
  imports: [],
  templateUrl: './googlelogin.component.html',
  styleUrl: './googlelogin.component.scss',
})
export class GoogleloginComponent {
  constructor(private _Router: Router) {}
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
  }
}
