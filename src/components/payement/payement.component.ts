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
  readyToPay: boolean = false;
  constructor() {
    render({
      id: '#payPalBtn',

      currency: 'USD',
      value: '100.00',
      onApprove: (details) => {
        alert('Transaction Succecful');
      },
    });
    const paymentToken = localStorage.getItem('__paypal_storage__');
    if (paymentToken) {
    }
  }
}
