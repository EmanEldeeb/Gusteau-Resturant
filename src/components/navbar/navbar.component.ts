import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  ngOnInit(): void {
    this._AuthService.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        console.log('nav', this.isAuthenticated);
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
