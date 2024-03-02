import { Component } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-payement',
  standalone: true,
  imports: [],
  templateUrl: './payement.component.html',
  styleUrl: './payement.component.scss',
})
export class PayementComponent {
  constructor() {
    const cart = localStorage.getItem('cart');
    const TotalPrice = cart ? JSON.parse(cart).totalPrice : null;
    render({
      id: '#payPalBtn',
      currency: 'USD',
      value: '100.00',
      onApprove: (details) => {
        alert('Transaction Succecful');
      },
    });
  }
}
