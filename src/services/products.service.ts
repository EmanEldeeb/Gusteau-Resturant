import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly myClient: HttpClient) {}

  private readonly URL_Categories =
    'https://gusteau-resturant-server-1.onrender.com/categoryname';
  private readonly URL_Category =
    'https://gusteau-resturant-server-1.onrender.com/';
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
    return this.myClient.get(
      `https://gusteau-resturant-server-1.onrender.com/${type}`
    );
  }

  postReview(
    review: string,
    name: string,
    id: number,
    reviewer: string
  ): Observable<any> {
    const reviewData = {
      id: Date.now(),
      review,
      itemId: id,
      name,
      reviewer,
    };
    return this.myClient.post(
      `https://gusteau-resturant-server-1.onrender.com/addReview`,
      reviewData
    );
  }
  getReview(): Observable<any> {
    return this.myClient.get(
      `https://gusteau-resturant-server-1.onrender.com/addReview`
    );
  }
}
