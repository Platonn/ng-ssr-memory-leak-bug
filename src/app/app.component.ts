import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  /**
   * Simulate 3s long task to artificially delay the app becoming stable
   * and so to delay finishing the SSR completion.
   */
  ngOnInit() {
    setTimeout(() => {
      console.log('3s setTimeout passed in AppComponent. Now app is stable.');
    }, 3_000);
  }
}
