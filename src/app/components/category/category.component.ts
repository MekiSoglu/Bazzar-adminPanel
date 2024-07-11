import { Component, OnInit } from '@angular/core';
import { CategoryDto } from "../../models/category-dto";
import { CategoryService } from "../../services/category.service";
import { CategoryDetailsDto } from '../../models/category-details-dto';
import { CategoryDetailsService } from '../../services/category-details.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: CategoryDto[] = [];
  categoryDetailsList: CategoryDetailsDto[] = [];
  selectedCategory: CategoryDto = new CategoryDto();
  selectedCategoryDetails: CategoryDetailsDto = new CategoryDetailsDto();
  categoryDetailsIds: number[] = [];
  selectedCategoryId: number | null = null;
  selectedCategoryDetailIds: number[] = [];

  constructor(
    private categoryService: CategoryService,
    private categoryDetailsService: CategoryDetailsService
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllCategoryDetails();
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      data => this.categories = data
    );
  }

  getAllCategoryDetails(): void {
    this.categoryDetailsService.getAllCategoryDetails().subscribe(
      data => this.categoryDetailsList = data
    );
  }

  addCategoryDetail(id: number | null): void {
    if (id !== null && !this.selectedCategoryDetailIds.includes(id)) {
      this.selectedCategoryDetailIds.push(id);
    }
  }

  getDetailNameById(id: number): string {
    const detail = this.categoryDetailsList.find(detail => detail.id === id);
    return detail ? detail.name : 'Unknown Detail';
  }

  saveCategory(): void {
    const categoryData = {
      parent_id: this.selectedCategoryId,
      categoryName: this.selectedCategory.categoryName,
      categoryDetailsId: this.selectedCategoryDetailIds
    };

    this.categoryService.createCategory(categoryData).subscribe(
      () => {
        this.getAllCategories();
        this.selectedCategory = new CategoryDto(); // Alanı sıfırlayın
        this.selectedCategoryDetailIds = []; // Listeyi sıfırlayın
        this.selectedCategoryId = null;
      }
    );
  }
}
