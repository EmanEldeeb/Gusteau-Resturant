import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ProductsService } from '../../services/products.service';
import { SearchPipe } from '../../pipes/search.pipe';
@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [AuthService, ProductsService],
  imports: [RouterModule, SearchPipe],
})
export class NavbarComponent implements OnInit {
  isAuthenticated!: boolean;
  userName: string = '';
  searchInput: string = 'a';
  allMeals: any[] = [];
  allcategory: string[] = [
    'Beef',
    'Chicken',
    'Lamb',
    'Pasta',
    'Seafood',
    'Side',
    'Dessert',
    'Breakfast',
  ];
  targetMeals: {}[] = [];

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _ProductsService: ProductsService
  ) {}
  ngOnInit(): void {
    this._AuthService.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        // console.log('nav', this.isAuthenticated);
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
    //search
    this.getallMealls();
  }

  signOut() {
    this.isAuthenticated = false;
    localStorage.removeItem('_token');
    localStorage.removeItem('cart');
    this._Router.navigate(['/login']);
  }
  getallMealls() {
    for (let i = 0; i < this.allcategory.length; i++) {
      this._ProductsService.getCategoryByName(this.allcategory[i]).subscribe({
        next: (res: any) => {
          this.allMeals = [...this.allMeals, ...res];
        },
      });
    }
  }
  search() {
    this.allMeals.map((meal) => {
      if (meal.name.startsWith(this.searchInput)) {
        console.log('FrOm search', meal.name);
      }
    });
  }
}
