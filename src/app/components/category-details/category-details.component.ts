import { Component, OnInit } from '@angular/core';
import {CategoryDetailsDto} from "../../models/category-details-dto";
import {CategoryDetailsService} from "../../services/category-details.service.spec";
;

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  categoryDetailsList: CategoryDetailsDto[] = [];
  selectedCategoryDetails: CategoryDetailsDto = new CategoryDetailsDto();

  constructor(private categoryDetailsService: CategoryDetailsService) { }

  ngOnInit(): void {
    this.getAllCategoryDetails();
  }

  getAllCategoryDetails(): void {
    this.categoryDetailsService.getAllCategoryDetails().subscribe(
      data => this.categoryDetailsList = data
    );
  }

  getCategoryDetails(id: number): void {
    this.categoryDetailsService.getCategoryDetails(id).subscribe(
      data => this.selectedCategoryDetails = data
    );
  }

  createCategoryDetails(): void {
    this.categoryDetailsService.createCategoryDetails(this.selectedCategoryDetails).subscribe(
      () => this.getAllCategoryDetails()
    );
  }

  updateCategoryDetails(): void {
    this.categoryDetailsService.updateCategoryDetails(this.selectedCategoryDetails).subscribe(
      () => this.getAllCategoryDetails()
    );
  }

  deleteCategoryDetails(id: number): void {
    this.categoryDetailsService.deleteCategoryDetails(id).subscribe(
      () => this.getAllCategoryDetails()
    );
  }

  deleteAllCategoryDetails(): void {
    this.categoryDetailsService.deleteAllCategoryDetails().subscribe(
      () => this.getAllCategoryDetails()
    );
  }
}
