import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatToolbarModule, MatButtonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  username: string | null = localStorage.getItem('username');

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
