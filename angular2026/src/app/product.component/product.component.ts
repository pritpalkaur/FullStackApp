import { Component, OnInit } from '@angular/core';
import { productService } from '../services/product.service';
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from '../models/product';

@Component({
  selector: 'app-product.component',
   imports: [CommonModule, 
        CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
   ],   // ✅ include here
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {

    // ✅ Declare products property
  products: Product[] = [];
  displayedColumns: string[] = ['name', 'price', 'stock', 'image',  'actions'];
 // ✅ form model
  newProduct = { name: '', price: 0, stock: 0 };
  
  constructor(private productService: productService,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
        next: (data) => {
      this.products = data;
      console.log('Products loaded:', data); // ✅ log here
    },
      error: (err) => console.error('Error fetching products', err)
    });
  }
selectedFile: File | null = null;

onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0];
}

createProduct(): void {
  if (this.selectedFile) {
    this.productService.createProductWithImage(this.newProduct, this.selectedFile).subscribe({
      next: () => {
        this.snackBar.open('Product created successfully!', 'Close', { duration: 3000 });
        this.newProduct = { name: '', price: 0, stock: 0 };
        this.selectedFile = null;
        this.loadProducts();
      },
      error: (err) => console.error('Error creating product', err)
    });
  } else {
    alert('Please select an image');
  }
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
