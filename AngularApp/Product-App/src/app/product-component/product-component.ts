import { Component } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Product } from '../models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule
  ],   // <-- Add this
  templateUrl: './product-component.html',
  styleUrl: './product-component.css',
})

export class ProductComponent {

  products: Product[] = [];
  newProduct: Product = { id: 0, name: '', price: 0 };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Product[]>('assets/products.json')
      .subscribe(data => this.products = data);
  }

  addProduct() {
    this.products.push({ ...this.newProduct });
    this.newProduct = { id: 0, name: '', price: 0 };
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }

  editProduct(product: Product) {
    this.newProduct = { ...product };
    this.deleteProduct(product.id);
  }
} 

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-product-component',
//    standalone: true,
//   imports: [],
//   templateUrl: './product-component.html',
//   styleUrl: './product-component.css',
// })
// export class ProductComponent {

// }
