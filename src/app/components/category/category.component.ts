import { Component, OnInit } from '@angular/core';
import {CategoryDto} from "../../models/category-dto";
import {CategoryService} from "../../services/category.service";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: CategoryDto[] = [];
  selectedCategory: CategoryDto = new CategoryDto();

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      data => this.categories = data
    );
  }

  getCategory(id: number): void {
    this.categoryService.getCategory(id).subscribe(
      data => this.selectedCategory = data
    );
  }

  createCategory(): void {
    this.categoryService.createCategory(this.selectedCategory).subscribe(
      () => this.getAllCategories()
    );
  }

  updateCategory(): void {
    this.categoryService.updateCategory(this.selectedCategory).subscribe(
      () => this.getAllCategories()
    );
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(
      () => this.getAllCategories()
    );
  }

  deleteAllCategories(): void {
    this.categoryService.deleteAllCategories().subscribe(
      () => this.getAllCategories()
    );
  }
}
