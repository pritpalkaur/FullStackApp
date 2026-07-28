import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
       HttpClientModule,   // ✅ must be here
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './product-component.html',
  styleUrls: ['./product-component.css'] // ✅ plural form
})
export class ProductComponent {
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  products: Product[] = [];
  newProduct: Product = { id: 0, name: '', price: 0 };

  constructor(private http: HttpClient,private productService: ProductService) {}

 ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Error loading products:', err)
    });
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe({
      next: (addedProduct) => {
        this.products.push(addedProduct);
        this.newProduct = { id: 0, name: '', price: 0 };
      },
      error: (err) => console.error('Error adding product:', err)
    });   
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter((p) => p.id !== id);
  }

  editProduct(product: Product): void {
    this.newProduct = { ...product };
    this.deleteProduct(product.id);
  }
}
