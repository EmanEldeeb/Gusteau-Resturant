import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    console.log(this.cartItems, this.cartTotalPrice);
  }
  deleteFromCart(index: any) {
    const LSCart = localStorage.getItem('cart');
    this.cart = LSCart ? JSON.parse(LSCart) : null;
    this.cart.totalPrice =
      this.cart.totalPrice -
      this.cartItems[index].price * this.cartItems[index].quantity;
    this.cart.items.splice(index, 1);
    this.cartItems = this.cart.items;
    this.cartTotalPrice = this.cart.totalPrice;
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  modifieProductCount(quantity: any) {}
}
