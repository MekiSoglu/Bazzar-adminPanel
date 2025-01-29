import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProductDto} from "../models/products-dto";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'http://localhost:80/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.baseUrl}`);
  }

  getProduct(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: ProductDto): Observable<any> {
    return this.http.post(`http://localhost:80/products`, product);
  }

  updateProduct(product: ProductDto): Observable<any> {
    return this.http.put(`${this.baseUrl}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAllProducts(): Observable<any> {
    return this.http.delete(`${this.baseUrl}`);
  }
}
