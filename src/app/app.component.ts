import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-panel';
  selectedTab: string = 'home';
  showCategorySubmenu: boolean = false;

  constructor(private router: Router) { }

  selectHome() {
    this.selectedTab = 'home';
    this.router.navigate(['/home']);
  }

  selectCategory() {
    this.selectedTab = 'category';
    this.showCategorySubmenu = !this.showCategorySubmenu; // Alt menüyü aç/kapa
  }

  selectCreateCategory() {
    this.selectedTab = 'createCategory';
    this.router.navigate(['/create-category']);
  }

  selectCreateDetails() {
    this.selectedTab = 'createDetails';
    this.router.navigate(['/create-details']);
  }

  selectProduct() {
    this.selectedTab = 'product';
    this.router.navigate(['/products']);
  }

  selectOrder() {
    this.selectedTab = 'order';
    this.router.navigate(['/orders']);
  }
}
