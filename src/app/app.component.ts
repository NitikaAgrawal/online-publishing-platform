import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private authService = inject(AuthService);
  public router = inject(Router);
  title = 'online-publishing';

  currentUser = this.authService.getCurrentUser;
  isAuthenticated = this.authService.isAuthenticated;

  logout() {
    this.authService.logout();
  }
}