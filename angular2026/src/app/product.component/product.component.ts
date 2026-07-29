import { Component, OnInit } from '@angular/core';
import { productService } from '../services/product.service';
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-product.component',
   imports: [CommonModule, 
        CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
   ],   // ✅ include here
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {

   products: any[] = [];
  displayedColumns: string[] = ['name', 'price', 'stock', 'actions'];
 // ✅ form model
  newProduct = { name: '', price: 0, stock: 0 };
  constructor(private productService: productService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Error fetching products', err)
    });
  }
    createProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe({
      next: () => {
        this.newProduct = { name: '', price: 0, stock: 0 };
        this.loadProducts();
      },
      error: (err) => console.error('Error creating product', err)
    });
  }
   // ✅ Add edit method
  editProduct(product: any): void {
    console.log('Editing product:', product);
    // You could navigate to an edit form or open a dialog here
  }

  // ✅ Add delete method
  deleteProduct(product: any): void {
    if (confirm(`Delete product ${product.name}?`)) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          console.log('Product deleted');
          this.loadProducts(); // refresh list
        },
        error: (err) => console.error('Error deleting product', err)
      });
    }
  }
}
