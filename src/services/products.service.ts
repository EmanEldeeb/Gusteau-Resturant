import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
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
  getData(type: string): Observable<any> {
    return this.myClient.get(`http://localhost:3000/${type}`);
  }

  postReview(
    review: string,
    name: string,
    id: number,
    reviewer: string
  ): Observable<any> {
    const reviewData = { review, id, name, reviewer };
    return this.myClient.post(`http://localhost:3000/addReview`, reviewData);
  }
  getReview(): Observable<any> {
    return this.myClient.get(`http://localhost:3000/addReview`);
  }
}
