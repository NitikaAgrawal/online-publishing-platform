import { Injectable, signal } from '@angular/core';
import { Author } from '../interfaces/author';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<Author | null>(null);
  private users: Author[] = [];
  constructor(private router: Router) {}

  register(userData: { name: string; email: string; password: string }): boolean {
   
    const newUser: Author = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      bio: 'New user',
      profilePicture: 'assets/default-profile.jpeg',
      joinDate: new Date()
    };
    
    this.users.push(newUser);   
    return true;
  }
  
login(email: string, password: string): boolean {
  
  const user = this.users.find(u => u.email === email);
  if (user) {
    this.currentUser.set(user);
    this.router.navigate(['/articles']);
    return true;
  }
  return false;
}
 
 
  loginWithGoogle(): void {
    const mockUser: Author = {
      id: 'google-123',
      name: 'Google User',
      email: 'google-user@example.com',
      bio: 'Google account user',
      profilePicture: 'assets/default-profile.jpeg',
      joinDate: new Date()
    };
    this.currentUser.set(mockUser);
    this.router.navigate(['/articles']);
  }

  loginWithFacebook(): void {
    const mockUser: Author = {
      id: 'facebook-456',
      name: 'Facebook User',
      email: 'facebook-user@example.com',
      bio: 'Facebook account user',
      profilePicture: 'assets/default-profile.jpeg',
      joinDate: new Date()
    };
    this.currentUser.set(mockUser);
    this.router.navigate(['/articles']);
  }
  logout(): void {
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  getCurrentUser(): Author | null {
    return this.currentUser();
  }
}






  


  