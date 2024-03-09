import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PayementComponent } from '../payement/payement.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, PayementComponent, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart: any;
  cartItems: any[] = [];
  cartTotalPrice = 0;
  quantityValue: number = 0;

  ngOnInit(): void {
    const LSCart = localStorage.getItem('cart');
    this.cart = LSCart ? JSON.parse(LSCart) : null;
    this.cartItems = this.cart.items;
    this.cartTotalPrice = this.cart.totalPrice;
  }
  updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  deleteFromCart(index: any) {
    this.cartItems.forEach((item: any, arrindex) => {
      if (arrindex == index) {
        this.cartTotalPrice = this.cartTotalPrice - item.price * item.quantity;
        this.cart.totalPrice = this.cartTotalPrice;
        this.cartItems.splice(index, 1);
      }
      this.updateCart();
    });
  }
  changecount(idx: any, flag: number) {
    this.cartItems.forEach((item: any, arrindex) => {
      if (arrindex == idx) {
        if (item.quantity == 1 && flag == -1) {
          this.deleteFromCart(idx);
          return;
        }
        if (flag == 1) {
          item.quantity++;
          this.cartTotalPrice = +this.cartTotalPrice + +item.price;
          this.cart.totalPrice = this.cartTotalPrice;
          this.updateCart();
        } else if (flag == -1 && item.quantity != 0) {
          item.quantity--;
          this.cartTotalPrice = +this.cartTotalPrice - +item.price;
          this.cart.totalPrice = this.cartTotalPrice;
          this.updateCart();
        }
      }
    });
  }
}
