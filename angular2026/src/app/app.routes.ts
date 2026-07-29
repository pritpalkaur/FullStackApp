import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component/layout.component';
import { HomeComponent } from './home.component/home.component';
import { ProductComponent } from './product.component/product.component';
import { OrdersComponent } from './orders.component/orders.component';
import { ReportsComponent } from './reports.component/reports.component';
import { SettingsComponent } from './settings.component/settings.component';
import { LoginComponent } from './login.component/login.component';
import { authGuard } from './login.component/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],   // ✅ guard applied
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];