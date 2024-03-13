import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule, RouterModule, FormsModule, CommonModule],
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
  quantityValue: number = 1;
  isAuthenticated!: boolean;
  isAdd: boolean = false;
  reviewInput: string = '';
  reviewList: any[] = [];
  userName: string = '';

  order: any;
  constructor(
    private _CartService: CartService,
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
    // get reviews

    this.getReviews();
  }
  getReviews() {
    this.reviewList = [];
    this.PService.getReview().subscribe({
      next: (res) => {
        this.reviewList = res.filter((review: any) => {
          return review.name === this.category && review.itemId == this.ID;
        });
        console.log(this.reviewList);
      },
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
    this.isAdd = true;
    setTimeout(() => {
      this.isAdd = false;
    }, 700);
  }
  sharereview() {
    this.userName = this._AuthService.getUserInfo()?.name;
    if (this.reviewInput.length > 0) {
      this.PService.postReview(
        this.reviewInput,
        this.category,
        this.ID,
        this.userName
      ).subscribe({
        next: (res) => {
          this.getReviews();
        },
      });
      this.reviewInput = '';
    }
  }
}
