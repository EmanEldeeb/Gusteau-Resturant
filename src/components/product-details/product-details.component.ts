import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule, RouterModule, FormsModule],
  providers: [ProductsService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  ID = 0;
  category: any;
  mealDetails: any;
  ingradiants: any;
  arr: any;
  relatedDishes: any = [];
  cart: any;
  quantityValue: number = 1;

  order: any;
  constructor(
    myActivated: ActivatedRoute,
    private PService: ProductsService,
    private cartService: CartService,
    private router: Router
  ) {
    this.ID = myActivated.snapshot.params['id'];
    this.category = myActivated.snapshot.params['category'];
  }

  ngOnInit(): void {
    this.PService.getProductById(this.category, this.ID).subscribe({
      next: (data) => {
        this.mealDetails = data;
        this.ingradiants = this.mealDetails.ingradients.join(' - ');
        this.mealDetails.ingradients = this.ingradiants;
        // console.log(this.mealDetails);
      },
      error: (err) => {
        throw err;
      },
    });
    this.PService.getCategoryByName(this.category).subscribe({
      next: (data) => {
        this.arr = data;
        // console.log(this.arr);
        for (let i = 0; i < 3; i++) {
          this.relatedDishes.push(this.arr[i]);
        }
      },
      error: (err) => {
        throw err;
      },
    });
  }
  // getValue(inputeValue: string, orderDetails: any) {
  //   Object.assign(orderDetails, { quantity: inputeValue });
  //   console.log(orderDetails);
  //   // this.PService.sharedData = orderDetails;
  //   // this.order = orderDetails;
  //   this.cartService.addToCart(orderDetails);
  //   this.router.navigate(['categories']);
  // }
  // addToCart(item: any) {
  // }

  addToCart(item: any) {}
  addTOCart() {
    const cart = localStorage.getItem('cart');
    const oldCart = cart ? JSON.parse(cart) : null;
    if (!oldCart.items.length) {
      console.log('first time');
      oldCart.items.push({
        quantity: this.quantityValue,
        id: this.mealDetails.id,
        price: this.mealDetails.price,
        name: this.mealDetails.name,
        image: this.mealDetails.imageUrl,
      });
      oldCart.totalPrice =
        +oldCart.totalPrice + +this.mealDetails.price * this.quantityValue;
      localStorage.setItem('cart', JSON.stringify(oldCart));
    } else {
      const itemExistsINDEX = oldCart.items.findIndex((item: any) => {
        return item.id == this.mealDetails.id;
      });
      const itemExists = oldCart.items[itemExistsINDEX];
      if (itemExists) {
        itemExists.quantity = +itemExists.quantity + +this.quantityValue;
        oldCart.totalPrice =
          +oldCart.totalPrice + +this.mealDetails.price * this.quantityValue;
        oldCart.items[itemExists] = itemExists;
        localStorage.setItem('cart', JSON.stringify(oldCart));
      }
      if (!itemExists) {
        oldCart.items.push({
          quantity: this.quantityValue,
          id: this.mealDetails.id,
          price: this.mealDetails.price,
          name: this.mealDetails.name,
          image: this.mealDetails.imageUrl,
        });
        oldCart.totalPrice =
          +oldCart.totalPrice + +this.mealDetails.price * this.quantityValue;
        localStorage.setItem('cart', JSON.stringify(oldCart));
      }
    }

    this.quantityValue = 1;
  }
}
