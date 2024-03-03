import { Component } from '@angular/core';

@Component({
  selector: 'app-addcartbtn',
  standalone: true,
  imports: [],
  templateUrl: './addcartbtn.component.html',
  styleUrl: './addcartbtn.component.scss',
})
export class AddcartbtnComponent {
  mealDetails: any;
  cart: any;
  quantityValue: number = 1;

  // ngOnInit(): void {
  //     next: (data) => {
  //       this.mealDetails = data;
  //       // console.log(this.mealDetails);
  //     },
  //     error: (err) => {
  //       throw err;
  //     },
  //   });
  //   this.PService.getCategoryByName(this.category).subscribe({
  //     next: (data) => {
  //       for (let i = 0; i < 3; i++) {
  //       }
  //     },
  //     error: (err) => {
  //       throw err;
  //     },
  //   });
  // }
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
