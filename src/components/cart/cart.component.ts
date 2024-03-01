import { Component } from '@angular/core';
import { PayementComponent } from '../payement/payement.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [PayementComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {}
