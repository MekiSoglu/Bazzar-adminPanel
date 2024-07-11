export class CategoryDto {
    id: number | null;
  parent_id: number;
  categoryName: string;
  product_Id: Set<number>;
  categoryDetailsId: number[];
  version: number;

  constructor() {
    this.id = null;
    this.parent_id = 0;
    this.categoryName = '';
    this.product_Id = new Set<number>();
    this.categoryDetailsId = [];
    this.version = 0;
  }
}
