import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout-component/layout-component';
import { HomeComponent } from '../home-component/home-component';
import { ProductComponent } from '../product-component/product-component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];
