import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HttpClientModule, RouterModule, FormsModule],
  providers: [ProductsService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  categoryName: any;
  AllMeals: any;
  minPrice = 0;
  maxPrice = 500;
  products: any[] = [];
  constructor(myActivated: ActivatedRoute, private PService: ProductsService) {
    this.categoryName = myActivated.snapshot.params['name'];
  }
  ngOnInit(): void {
    this.PService.getCategoryByName(this.categoryName).subscribe({
      next: (data) => {
        this.AllMeals = data;
      },
      error: (error) => {
        throw error;
      },
    });
    // create cart holder
  }
  getValue(order: any) {
    console.log(order);
  }
  applyFilter() {
    this.products = this.AllMeals.filter((product: any) => {
      return product.price >= this.minPrice && product.price <= this.maxPrice;
    });
  }
}
