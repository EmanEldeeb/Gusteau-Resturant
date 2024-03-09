import { Component } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { HomeInterface } from '../../../../interface/home-interface';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-specialities',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [ProductsService],
  templateUrl: './specialities.component.html',
  styleUrl: './specialities.component.scss',
})
export class SpecialitiesComponent {
  ourSpecialities: HomeInterface[] = [];

  constructor(private _ProductsService: ProductsService) {}
  ngOnInit(): void {
    this._ProductsService.getCategoryByName('Seafood').subscribe({
      next: (data) => {
        this.ourSpecialities.push({
          ...Object.values(data)[5],
          category: 'Seafood',
        });
      },
    });
    this._ProductsService.getCategoryByName('Seafood').subscribe({
      next: (data) => {
        this.ourSpecialities.push({
          ...Object.values(data)[2],
          category: 'Seafood',
        });
      },
    });
    this._ProductsService.getCategoryByName('Chicken').subscribe({
      next: (data) => {
        this.ourSpecialities.push({
          ...Object.values(data)[1],
          category: 'Chicken',
        });
      },
    });
  }
}
