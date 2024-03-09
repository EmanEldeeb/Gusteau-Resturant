import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NgFor],
  providers: [ProductsService],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  bestSellerArrData: any[] = [];
  rateAnnualProfitsArrData: any[] = [];
  AnnualArrData: any[] = [];

  constructor(private _ProductsService: ProductsService) {
    this._ProductsService.getData('BestSeller').subscribe({
      next: (response) => {
        this.bestSellerArrData = response;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._ProductsService.getData('rateProfit').subscribe({
      next: (response) => {
        this.rateAnnualProfitsArrData = response;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._ProductsService.getData('years').subscribe({
      next: (response) => {
        this.AnnualArrData = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
