import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  providers: [ProductsService],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  cartItems: any[] = [];
  constructor(
    private PService: ProductsService,
    private cartService: CartService
  ) {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems);
  }
  AllCategries: any;
  ngOnInit(): void {
    this.PService.getAllCategories().subscribe({
      next: (data) => {
        this.AllCategries = data;
      },
      error: (error) => {},
    });
  }
}
