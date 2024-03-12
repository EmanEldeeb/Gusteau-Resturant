import { Component } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { HomeInterface } from '../../../../interface/home-interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dining-plates',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [ProductsService],
  templateUrl: './dining-plates.component.html',
  styleUrl: './dining-plates.component.scss',
})
export class DiningPlatesComponent {
  ourSpecialities: HomeInterface[] = [];
  constructor(private _ProductsService: ProductsService) {}
  ngOnInit(): void {
    this._ProductsService.getCategoryByName('Seafood').subscribe({
      next: (data) =>
        this.ourSpecialities.push({
          ...Object.values(data)[3],
        }),
    });
    this._ProductsService.getCategoryByName('Seafood').subscribe({
      next: (data) =>
        this.ourSpecialities.push({
          ...Object.values(data)[5],
        }),
    });
    this._ProductsService.getCategoryByName('Chicken').subscribe({
      next: (data) =>
        this.ourSpecialities.push({
          ...Object.values(data)[6],
        }),
    });
  }
}
