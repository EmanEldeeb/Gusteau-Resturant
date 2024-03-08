import { Component } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { HomeInterface } from '../../../../interface/home-interface';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-special',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [ProductsService],
  templateUrl: './special.component.html',
  styleUrl: './special.component.scss',
})
export class SpecialComponent {
  meals: HomeInterface[] = [];
  category: string = '';
  constructor(private _ProductsService: ProductsService) {}
  ngOnInit(): void {
    this._ProductsService.getCategoryByName('Beef').subscribe({
      next: (data) => {
        this.meals.push(Object.values(data)[0]);
        this.category = 'Beef';
      },
    });
    this._ProductsService.getCategoryByName('Seafood').subscribe({
      next: (data) => {
        this.meals.push(Object.values(data)[0]);
        this.category = 'Seafood';
      },
    });
    this._ProductsService.getCategoryByName('Chicken').subscribe({
      next: (data) => {
        this.meals.push(Object.values(data)[0]);
        this.category = 'Chicken';
      },
    });
  }
}
