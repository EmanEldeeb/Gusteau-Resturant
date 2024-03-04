import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [AuthService],
})
export class NavbarComponent implements OnInit {
  isAuthenticated!: boolean;
  userName: string = '';

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  ngOnInit(): void {
    this._AuthService.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        console.log('nav', this.isAuthenticated);
        const token = localStorage.getItem('_token') || '';
        if (token != '') {
          const decoded: any = jwtDecode(token);
          this.userName = decoded.name;
          console.log('token', this.userName);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  signOut() {
    this.isAuthenticated = false;
    localStorage.removeItem('_token');
    localStorage.removeItem('cart');
    this._Router.navigate(['/login']);
  }
}
