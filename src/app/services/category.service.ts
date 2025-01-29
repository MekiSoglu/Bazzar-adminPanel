import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDto } from '../models/category-dto';
import { CategoryDetailsDto } from '../models/category-details-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:80/category';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.baseUrl}`);
  }

  getCategory(id: number): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.baseUrl}/${id}`);
  }

  getDetails(id: number): Observable<CategoryDetailsDto[]> {
    return this.http.get<CategoryDetailsDto[]>(`${this.baseUrl}/details/${id}`);
  }

  createCategory(category: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, category);
  }

  updateCategory(category: CategoryDto): Observable<any> {
    return this.http.put(`${this.baseUrl}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAllCategories(): Observable<any> {
    return this.http.delete(`${this.baseUrl}`);
  }
}
