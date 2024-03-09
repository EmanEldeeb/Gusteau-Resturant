// import { HttpClientModule } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { ProductsService } from '../../services/products.service';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { CartService } from '../../services/cart.service';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-product-details',
//   standalone: true,
//   imports: [HttpClientModule, RouterModule, FormsModule],
//   providers: [ProductsService, CartService],
//   templateUrl: './product-details.component.html',
//   styleUrl: './product-details.component.scss',
// })
// export class ProductDetailsComponent implements OnInit {
//   ID = 0;
//   category: any;
//   mealDetails: any;
//   ingradiants: any;
//   arr: any;
//   relatedDishes: any = [];
//   // cart: any;
//   // for cart only inproduct details
//   quantityValue: number = 1;
//   isAuthenticated!: boolean;

//   order: any;
//   constructor(
//     myActivated: ActivatedRoute,
//     private PService: ProductsService,
//     private _CartService: CartService,
//     private router: Router,
//     private _AuthService: AuthService
//   ) {
//     this.ID = myActivated.snapshot.params['id'];
//     this.category = myActivated.snapshot.params['category'];
//   }

//   ngOnInit(): void {
//     this.myActivated.params.subscribe((change) => {
//       this.ID = this.myActivated.snapshot.params['id'];
//       this.category = this.myActivated.snapshot.params['category'];
//       this.load();
//     });
//     // change addtocart status
//     this._AuthService.isAuthenticated$.subscribe({
//       next: (isAuthenticated) => {
//         this.isAuthenticated = isAuthenticated;
//         console.log('prod-details', this.isAuthenticated);
//       },
//       error: (err) => {
//         console.log(err);
//       },
//     });
//   }
//   load() {
//     this.relatedDishes = [];
//     this.PService.getProductById(this.category, this.ID).subscribe({
//       next: (data) => {
//         this.mealDetails = data;
//         this.ingradiants = this.mealDetails.ingradients.join(' - ');
//         this.mealDetails.ingradients = this.ingradiants;
//       },
//       error: (err) => {
//         throw err;
//       },
//     });
//     this.PService.getCategoryByName(this.category).subscribe({
//       next: (data) => {
//         this.arr = data;
//         for (let j = 0; j < this.arr.length; j++) {
//           if (this.arr[j]?.id == this.mealDetails?.id) {
//             this.arr.splice(j, 1);
//           }
//         }
//         for (let i = 0; i < 3; i++) {
//           this.relatedDishes.push(this.arr[i]);
//         }
//       },
//       error: (err) => {
//         throw err;
//       },
//     });
//   }
//   // getValue(inputeValue: string, orderDetails: any) {
//   //   Object.assign(orderDetails, { quantity: inputeValue });
//   //   console.log(orderDetails);
//   //   // this.PService.sharedData = orderDetails;
//   //   // this.order = orderDetails;
//   //   this.cartService.addToCart(orderDetails);
//   //   this.router.navigate(['categories']);
//   // }
//   // addToCart(item: any) {
//   // }

//   // addToCart(item: any) {}
//   // working original
//   // addTOCart() {
//   //   const cart = localStorage.getItem('cart');
//   //   const oldCart = cart ? JSON.parse(cart) : null;
//   //   if (!oldCart.items.length) {
//   //     console.log('first time');
//   //     oldCart.items.push({
//   //       quantity: this.quantityValue,
//   //       id: this.mealDetails.id,
//   //       price: this.mealDetails.price,
//   //       name: this.mealDetails.name,
//   //       image: this.mealDetails.imageUrl,
//   //     });
//   //     oldCart.totalPrice =
//   //       +oldCart.totalPrice + +this.mealDetails.price * this.quantityValue;
//   //     localStorage.setItem('cart', JSON.stringify(oldCart));
//   //   } else {
//   //     const itemExistsINDEX = oldCart.items.findIndex((item: any) => {
//   //       return item.id == this.mealDetails.id;
//   //     });
//   //     const itemExists = oldCart.items[itemExistsINDEX];
//   //     if (itemExists) {
//   //       itemExists.quantity = +itemExists.quantity + +this.quantityValue;
//   //       oldCart.totalPrice =
//   //         +oldCart.totalPrice + +this.mealDetails.price * this.quantityValue;
//   //       oldCart.items[itemExists] = itemExists;
//   //       localStorage.setItem('cart', JSON.stringify(oldCart));
//   //     }
//   //     if (!itemExists) {
//   //       oldCart.items.push({
//   //         quantity: this.quantityValue,
//   //         id: this.mealDetails.id,
//   //         price: this.mealDetails.price,
//   //         name: this.mealDetails.name,
//   //         image: this.mealDetails.imageUrl,
//   //       });
//   //       oldCart.totalPrice =
//   //         +oldCart.totalPrice + +this.mealDetails.price * this.quantityValue;
//   //       localStorage.setItem('cart', JSON.stringify(oldCart));
//   //     }
//   //   }

//   //   this.quantityValue = 1;
//   // }
//   // work with service for cart btn
//   passToAddTocart(meal: any) {
//     this._CartService.addTOCartFun(meal, this.quantityValue);
//     this.quantityValue = 1;
//   }
// }

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
  ID = number;
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
        console.log('prod-details', this.isAuthenticated);
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
    console.log(meal);
    this._CartService.addTOCartFun(meal, this.quantityValue);
    console.log(this.quantityValue);
    this.quantityValue = 1;
  }
}
