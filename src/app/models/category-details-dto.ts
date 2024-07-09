export class CategoryDetailsDto {
  id: number;
  name: string;
  categoryList: number[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.categoryList = [];
  }
}
