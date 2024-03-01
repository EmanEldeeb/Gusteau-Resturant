import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  providers: [ProductsService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  categoryName: any;
  constructor(
    myActivated: ActivatedRoute,
    private PService: ProductsService,
    private router: Router
  ) {
    this.categoryName = myActivated.snapshot.params['name'];
  }
  AllMeals: any;
  ngOnInit(): void {
    this.PService.getCategoryByName(this.categoryName).subscribe({
      next: (data) => {
        this.AllMeals = data;
      },
      error: (error) => {
        throw error;
      },
    });
  }
  getValue(order: any) {
    console.log(order);
  }
}
