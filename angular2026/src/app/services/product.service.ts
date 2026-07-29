import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Example API endpoint
const API_URL = 'http://localhost/api/Product';
@Injectable({
  providedIn: 'root',
})
export class productService {
constructor(private http: HttpClient) {}

  // Get all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  // Get product by ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/${id}`);
  }

  // Create new product
  createProduct(product: any): Observable<any> {
    return this.http.post<any>(API_URL, product);
  }

  // Update product
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/${id}`, product);
  }

  // Delete product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/${id}`);
  }
}
