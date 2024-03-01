import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // sharedData: any;
  constructor(private readonly myClient: HttpClient) {}

  private readonly URL_Categories = 'http://localhost:3000/categoryname';
  private readonly URL_Category = 'http://localhost:3000/';
  getAllCategories() {
    return this.myClient.get(this.URL_Categories);
  }
  getCategoryByName(name: string) {
    return this.myClient.get(`${this.URL_Category}${name}`);
  }
  getProductById(name: string, id: number) {
    return this.myClient.get(`${this.URL_Category}${name}/${id}`);
  }
}
