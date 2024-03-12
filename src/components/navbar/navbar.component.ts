import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductsService } from '../../services/products.service';
import { SearchPipe } from '../../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [AuthService, ProductsService],
  imports: [RouterModule, SearchPipe, FormsModule],
})
export class NavbarComponent implements OnInit {
  isAuthenticated!: boolean;
  userName: string = '';
  searchInput: string = '';
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
  targetMeals: any[] = [];
  activesearch: boolean = false;

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _ProductsService: ProductsService
  ) {}
  ngOnInit(): void {
    this._AuthService.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        this.userName = this._AuthService.getUserInfo()?.name;
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
    this.activesearch = false;
    this.targetMeals = this.allMeals.filter((meal) =>
      meal.name.toLowerCase().startsWith(this.searchInput.toLowerCase())
    );
  }
  close() {
    this.searchInput = '';
    this.activesearch = !this.activesearch;
  }
}
