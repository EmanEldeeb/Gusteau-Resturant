import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  providers: [ProductsService],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  beefArrData: any[] = [];
  chickenArrData: any[] = [];
  lambArrData: any[] = [];
  pastaArrData: any[] = [];
  seafoodArrData: any[] = [];
  sideArrData: any[] = [];
  dessertArrData: any[] = [];
  breakfastArrData: any[] = [];

  constructor(private _ProductsService: ProductsService) {
    this._ProductsService.getData('Beef').subscribe({
      next: (response) => {
        this.beefArrData = response;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._ProductsService.getData('Chicken').subscribe({
      next: (response) => {
        this.chickenArrData = response;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._ProductsService.getData('Lamb').subscribe({
      next: (response) => {
        this.lambArrData = response;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._ProductsService.getData('Pasta').subscribe({
      next: (response) => {
        this.pastaArrData = response;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._ProductsService.getData('Seafood').subscribe({
      next: (response) => {
        this.seafoodArrData = response;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._ProductsService.getData('Side').subscribe({
      next: (response) => {
        this.sideArrData = response;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._ProductsService.getData('Dessert').subscribe({
      next: (response) => {
        this.dessertArrData = response;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._ProductsService.getData('Breakfast').subscribe({
      next: (response) => {
        this.breakfastArrData = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
