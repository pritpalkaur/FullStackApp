import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']   // plural here
})
export class App {
  protected readonly title = signal('angular2026');

  // Define the method properly
  alertTitle(): void {
    alert(this.title());
  }
}
