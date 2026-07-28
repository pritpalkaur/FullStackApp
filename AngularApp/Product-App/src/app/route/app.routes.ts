import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout-component/layout.component';
import { HomeComponent } from '../home-component/home-component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];