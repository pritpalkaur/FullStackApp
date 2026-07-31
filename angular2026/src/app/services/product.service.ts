import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Example API endpoint
//const apiUrl = 'https://localhost:7061/api/Product';
@Injectable({
  providedIn: 'root',
})
export class productService {
    // ✅ consistent lowercase name
  private apiUrl = 'https://localhost:7061/api/Product';
  //private apiUrl = 'http://localhost/api/Product'; // ✅ consistent lowercase name
constructor(private http: HttpClient) {}

  // Get all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get product by ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create new product
createProductWithImage(product: any, file?: File): Observable<any> {
  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('price', product.price.toString());
  formData.append('stock', product.stock.toString());

  if (file) {
    formData.append('image', file);
  }

  return this.http.post<any>(this.apiUrl, formData).pipe(
    // ✅ Log successful responses
    tap((response) => console.log('Product created successfully:', response)),

    // ✅ Handle and log errors
    catchError((error) => {
      console.error('Error creating product:', error);
      if (error.status === 400) {
        console.error('Bad Request — check DTO or FormData keys.');
      } else if (error.status === 500) {
        console.error('Server error — check backend logs.');
      } else {
        console.error('Unexpected error:', error.message);
      }
      return throwError(() => error);
    })
  );
}
  // Update product
updateProduct(id: number, product: any, file?: File): Observable<any> {
  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('price', product.price.toString());
  formData.append('stock', product.stock.toString());

  if (file) {
    formData.append('image', file);
  }

  return this.http.put<any>(`${this.apiUrl}/${id}`, formData).pipe(
    tap((res) => console.log('✅ Product updated:', res)),
    catchError((err) => {
      console.error('❌ Error updating product:', err);
      return throwError(() => err);
    })
  );
}

  // Delete product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
