export interface Product {
  id?: number;        // optional, since backend generates it
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;  // optional, holds photo path/URL
}
