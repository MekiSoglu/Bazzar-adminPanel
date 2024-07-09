import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDto } from '../models/category-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:4444/category';

  constructor(private httpClient: HttpClient) { }

  getCategory(id: number): Observable<CategoryDto> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<CategoryDto>(url);
  }

  getAllCategories(): Observable<CategoryDto[]> {
    return this.httpClient.get<CategoryDto[]>(this.baseUrl);
  }

  createCategory(category: CategoryDto): Observable<void> {
    return this.httpClient.post<void>(this.baseUrl, category);
  }

  updateCategory(category: CategoryDto): Observable<void> {
    return this.httpClient.put<void>(this.baseUrl, category);
  }

  deleteCategory(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }

  deleteAllCategories(): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl);
  }
}
