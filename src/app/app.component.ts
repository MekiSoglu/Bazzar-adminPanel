import {Component, ViewChild, AfterViewInit, signal} from '@angular/core';
import { Router } from '@angular/router';
import { MinCategoryDto } from './models/minCategory-dto';
import { AraclarComponent } from './components/araclar/araclar.component';
import {tableNameService} from "./services/table-name.service";
import {DynamicJoinService} from "./services/DynamicJoin.service";
import {IslemlerComponent} from "./components/islemler/islemler.component";
import {IslemlerimComponent} from "./components/islemlerim/islemlerim.component";
import {IslemlerService} from "./services/Islemler.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'admin-panel';
  selectedTab: string = 'home';
  minCategory: MinCategoryDto[] = []; // Tüm kategoriler
  activeCategories: MinCategoryDto[] = []; // En üst seviyedeki kategoriler
  expandedCategories: Set<number> = new Set(); // Açılmış kategorilerin ID'lerini tutar
  showCategories: boolean = false; // Başlangıçta kategoriler görünmez
  showCategorySubmenu: boolean = false;
  tableNames: string[] = []; // ✅ Backend'den gelecek tablo isimleri
    showTables: boolean = false; // ✅ Yeni tablo görünürlüğü kontrolü

  showCari: boolean = false; // Başlangıçta gizli olacak

    showCarilerim: boolean = false; // Başlangıçta gizli olacak


  cariler: string[] = []; // 🛠 Backend'den çekilen cariler listesi

    showIslemlerim: boolean = false; // ✅ "İşlemlerim" menüsü başlangıçta kapalı
    islemler: string[] = []; // ✅ İşlemler listesini saklayan değişken






  @ViewChild(AraclarComponent) araclarComponent!: AraclarComponent; // AraclarComponent'e erişim

  constructor(private router: Router, private tableNameService: tableNameService , private dynamicJoinService: DynamicJoinService , private islemlerService:IslemlerService ) { }

  ngAfterViewInit() {
    // `AraclarComponent` yüklenmişse, tüm kategorileri yükle
    if (this.araclarComponent) {

    }
  }

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

selectArac() {
    this.selectedTab = 'arac';
    this.router.navigate(['/araclar']);


    // ✅ Kategorileri aç/kapat (toggle)
    this.showCategories = !this.showCategories;

    // ✅ Tabloların açılmasını engelle
    this.showTables = false;

    // ✅ Eğer açık hale geldiyse, araçları yükle
    if (this.showCategories) {
        setTimeout(() => {
            if (this.araclarComponent) {
                console.log("✅ AraclarComponent mevcut, yükleme başlatılıyor...");
                this.araclarComponent.loadProductAndDetails(-1);
                this.araclarComponent.loadCategories();
            } else {
                console.warn("⚠️ AraclarComponent henüz yüklenmedi, işlem iptal edildi!");
            }
        }, 200);
    }
}




  // AraclarComponent'ten gelen veriyi burada alıyoruz
  updateCategories(categories: MinCategoryDto[]) {
    this.minCategory = categories;
    this.activeCategories = categories.filter(c => c.parentId === null);
  }

  // Bir kategoriye tıklandığında, alt kategorileri aç/kapat ve ID'yi AraclarComponent'e gönder
  toggleCategory(categoryId: number) {
    if (this.expandedCategories.has(categoryId)) {
      this.expandedCategories.delete(categoryId); // Eğer açık ise, kapat
    } else {
      this.expandedCategories.add(categoryId); // Eğer kapalı ise, aç

        this.araclarComponent.loadProductAndDetails(categoryId); // Seçili kategoriyi yükle

    }
  }

  // Seçili kategoriye ait alt kategorileri getir
  getChildCategories(parentId: number): MinCategoryDto[] {
    return this.minCategory.filter(category => category.parentId === parentId);
  }

  selectCreateTable(){
       this.selectedTab = 'createTable';
    this.router.navigate(['/create-table']);
  }


  // ✅ Tabloları aç/kapat ve backend'den listeyi çek
toggleTables() {
    console.log("✅ 'toggleTables' fonksiyonu çağrıldı!");

    this.showTables = !this.showTables;
    console.log("🔄 showTables değeri:", this.showTables);

    if (this.showTables && this.tableNames.length === 0) {
        console.log("🔄 Backend'den tablo isimleri çekiliyor...");
        this.fetchTableNames();
    }
}



  // ✅ Backend'den tabloları getir
fetchTableNames() {
    console.log("🔍 Backend'den tablo isimleri çekme işlemi başladı...");

    this.tableNameService.getCreateTableName().subscribe(
      (data) => {
        console.log("✅ Backend'den gelen ham veri:", data);

        if (Array.isArray(data)) {
          this.tableNames = data.map(table => table.tableName); // ✅ Object -> String dönüşümü
          console.log("✅ İşlenen tablo isimleri:", this.tableNames);
        } else {
          console.error("⚠️ Beklenmeyen veri formatı:", data);
          this.tableNames = [];
        }
      },
      (error) => {
        console.error("❌ Tablo isimleri yüklenirken hata oluştu:", error);
      }
    );
}

selectTable(tableName: string) {
    this.selectedTab = 'tables';
    this.router.navigate(['/tablolarim', tableName]); // Dinamik yönlendirme
}


toggleCari() {
  this.showCari = !this.showCari; // Cari menüsünü aç/kapat
}

selectCreateCari() {
  this.selectedTab = 'createCari';
  this.router.navigate(['/cari']); // ✅ Cari sayfasına yönlendirme yap
}

  /** ✅ Backend'den Carileri Yükle */
  loadCariler() {
    this.dynamicJoinService.getCariler().subscribe(data => {
      this.cariler = data;
      console.log("✅ Yüklenen Cariler:", this.cariler);
    }, error => {
      console.error('Carileri yüklerken hata oluştu:', error);
    });
  }

  /** ✅ Carilerim menüsünü aç/kapat */
  toggleCarilerim() {
    this.showCarilerim = !this.showCarilerim;

    if (this.showCarilerim && this.cariler.length === 0) {
      this.loadCariler(); // ✅ Eğer daha önce yüklenmemişse, açıldığında yükle
    }
  }

  /** ✅ Kullanıcı bir cariye tıkladığında yönlendir */
  /** ✅ Kullanıcı bir cariye tıkladığında yönlendir */
selectCari(cariName: string) {
  const encodedCariName = encodeURIComponent(cariName); // ✅ Türkçe karakterleri encode et
  this.router.navigate(['/carilerim', encodedCariName]);
}


selectIslemler() {
  this.selectedTab = 'islemler';
  this.router.navigate(['/islemler']);
}


selectIslemlerim() {
  this.selectedTab = 'islemlerim';
  this.router.navigate(['/islemlerim']);
}

 toggleIslemlerim() {
    this.showIslemlerim = !this.showIslemlerim;

    if (this.showIslemlerim && this.islemler.length === 0) {
      this.fetchIslemler();
    }
  }

  /** ✅ API'den işlemleri çek */
fetchIslemler() {
  this.islemlerService.getTables().subscribe(
    (data) => {
      this.islemler = data; // ✅ API'den dönen `string[]` doğrudan alınır
      console.log("✅ İşlemler başarıyla alındı:", this.islemler);
    },
    (error) => {
      console.error("🚨 İşlemler yüklenirken hata oluştu:", error);
    }
  );
}


  /** ✅ Kullanıcı bir işlem seçtiğinde yönlendir */
  selectIslem(islemAdi: string) {
    this.router.navigate(['/islemlerim', encodeURIComponent(islemAdi)]);
  }




}
