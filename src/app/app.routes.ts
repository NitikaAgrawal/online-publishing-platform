import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ArticleEditorComponent } from './components/article/article-editor/article-editor.component';
import { ArticleListComponent } from './components/article/article-list/article-list.component';
import { CreatePostComponent } from './components/create-post.component';
export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'articles', component: ArticleListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'create-post', component: CreatePostComponent},
  { 
    path: 'articles', 
    loadComponent: () => import('./components/article/article-list/article-list.component').then(m => m.ArticleListComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'articles/:id', 
    loadComponent: () => import('./components/article/article-detail/article-detail.component').then(m => m.ArticleDetailComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'authors', 
    loadComponent: () => import('./components/article/author-list/author-list.component').then(m => m.AuthorListComponent), 
    canActivate: [authGuard]
  },
  { 
    path: 'create-article', 
    loadComponent: () => import('./components/article/article-editor/article-editor.component').then(m => m.ArticleEditorComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'create-post', 
    loadComponent: () => import('./components/create-post.component').then(m => m.CreatePostComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/articles' }
];