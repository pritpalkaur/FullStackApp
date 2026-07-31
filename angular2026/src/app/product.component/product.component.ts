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
  // form models
  newProduct = { name: '', price: 0, stock: 0 };
  selectedProduct: any = null;
  isEditing = false;
  // allow null to be assigned when clearing the selected file
  selectedFile: File | null = null;

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

// Called when user clicks "Edit"
editProduct(product: Product): void {
  console.log('Editing product:', product);

  // Copy product into a local object bound to your form
  this.selectedProduct = { ...product };

  // Switch to edit mode so template shows Update button
  this.isEditing = true;

  // Reset any previously selected file
  this.selectedFile = undefined;
}

// Called when user clicks "Update"
updateProduct(): void {
  if (!this.selectedProduct) return;

  this.productService.updateProduct(
    this.selectedProduct.id,
    this.selectedProduct,
    this.selectedFile
  ).subscribe({
    next: (res) => {
      console.log('✅ Product updated:', res);
      this.snackBar.open('Product updated successfully!', 'Close', { duration: 3000 });
      this.isEditing = false;
      this.selectedProduct = null;
      this.selectedFile = undefined;
      this.loadProducts(); // refresh list
    },
    error: (err) => console.error('❌ Error updating product:', err)
  });
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
