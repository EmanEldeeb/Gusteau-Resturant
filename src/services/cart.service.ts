import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  addTOCartFun(mealDetails: any, quantityValue: number) {
    const cart = localStorage.getItem('cart');
    const oldCart = cart ? JSON.parse(cart) : null;
    if (!oldCart.items.length) {
      oldCart.items.push({
        quantity: quantityValue,
        id: mealDetails.id,
        price: mealDetails.price,
        name: mealDetails.name,
        image: mealDetails.imageUrl,
      });
      oldCart.totalPrice =
        +oldCart.totalPrice + +mealDetails.price * quantityValue;
      localStorage.setItem('cart', JSON.stringify(oldCart));
    } else {
      const itemExistsINDEX = oldCart.items.findIndex((item: any) => {
        return item.id == mealDetails.id;
      });
      const itemExists = oldCart.items[itemExistsINDEX];
      if (itemExists) {
        itemExists.quantity = +itemExists.quantity + +quantityValue;
        oldCart.totalPrice =
          +oldCart.totalPrice + +mealDetails.price * quantityValue;
        oldCart.items[itemExists] = itemExists;
        localStorage.setItem('cart', JSON.stringify(oldCart));
      }
      if (!itemExists) {
        oldCart.items.push({
          quantity: quantityValue,
          id: mealDetails.id,
          price: mealDetails.price,
          name: mealDetails.name,
          image: mealDetails.imageUrl,
        });
        oldCart.totalPrice =
          +oldCart.totalPrice + +mealDetails.price * quantityValue;
        localStorage.setItem('cart', JSON.stringify(oldCart));
      }
    }

    quantityValue = 1;
  }
}
