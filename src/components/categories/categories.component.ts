import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  providers: [ProductsService],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  constructor(private PService: ProductsService) {}
  AllCategries: any;
  ngOnInit(): void {
    this.PService.getAllCategories().subscribe({
      next: (data) => {
        this.AllCategries = data;
      },
      error: (err) => {
        throw new Error(err);
      },
    });
  }
}
