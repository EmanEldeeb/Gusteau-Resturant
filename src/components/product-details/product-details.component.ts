import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule, RouterModule, FormsModule],
  providers: [ProductsService, CartService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  ID: number;
  category: string;
  mealDetails: any;
  ingradiants: string[] = [];
  arr: any;
  relatedDishes: any = [];
  // cart
  quantityValue: number = 1;
  isAuthenticated!: boolean;

  order: any;
  constructor(
    private _CartService: CartService,
    private router: Router,
    private _AuthService: AuthService,
    private myActivated: ActivatedRoute,
    private PService: ProductsService
  ) {
    this.ID = myActivated.snapshot.params['id'];
    this.category = myActivated.snapshot.params['category'];
  }

  ngOnInit(): void {
    // change addtocart status
    this._AuthService.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.myActivated.params.subscribe((change) => {
      this.ID = this.myActivated.snapshot.params['id'];
      this.category = this.myActivated.snapshot.params['category'];

      this.load();
    });
  }
  load() {
    this.relatedDishes = [];
    this.PService.getProductById(this.category, this.ID).subscribe({
      next: (data) => {
        this.mealDetails = data;
        this.ingradiants = this.mealDetails.ingradients.join(' - ');
        this.mealDetails.ingradients = this.ingradiants;
      },
      error: (err) => {
        throw err;
      },
    });
    this.PService.getCategoryByName(this.category).subscribe({
      next: (data) => {
        this.arr = data;
        for (let j = 0; j < this.arr.length; j++) {
          if (this.arr[j]?.id == this.mealDetails?.id) {
            this.arr.splice(j, 1);
          }
        }
        for (let i = 0; i < 3; i++) {
          this.relatedDishes.push(this.arr[i]);
        }
      },
      error: (err) => {
        throw err;
      },
    });
  }

  passToAddTocart(meal: any) {
    this._CartService.addTOCartFun(meal, this.quantityValue);
    this.quantityValue = 1;
  }
}
