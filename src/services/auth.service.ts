import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private _HttpClient: HttpClient) {
    // Check the token state during the initialization of the service
    AuthService.checkTokenState();
  }

  postUserDataToServer(body: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      body
    );
  }

  postLoginRequest(body: any): Observable<any> {
    // Make the HTTP post request
    const loginObservable = this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      body
    );

    // Check token state after making the request
    AuthService.checkTokenState();

    return loginObservable;
  }

  static checkTokenState(): void {
    const tokenState: any = localStorage.getItem('_token');
    AuthService.isAuthenticatedSubject.next(!!tokenState); // Set to true if token exists, otherwise false
  }

  isAuthenticated$: Observable<boolean> =
    AuthService.isAuthenticatedSubject.asObservable();

  setAuthenticationStatus(isAuthenticated: boolean): void {
    AuthService.isAuthenticatedSubject.next(isAuthenticated);
  }
}
