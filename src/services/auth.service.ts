import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  postUserDataToServer(body: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      body
    );
  }
  postLoginRequest(body: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      body
    );
  }
  // converting register to sign out by subscribe to isAuthenticated variable
  static isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  isAuthenticated$: Observable<boolean> =
    AuthService.isAuthenticatedSubject.asObservable();

  setAuthenticationStatus(isAuthenticated: boolean): void {
    console.log('service', AuthService.isAuthenticatedSubject);
    AuthService.isAuthenticatedSubject.next(isAuthenticated);
  }
}
