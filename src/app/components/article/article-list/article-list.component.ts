import { Component, inject } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { ArticleCardComponent } from '../../article-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeaturedArticlesComponent } from '../../featured-articles/featured-articles.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ArticleCardComponent,FeaturedArticlesComponent,RouterModule ],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
  private articleService = inject(ArticleService);

  searchQuery = '';
  currentPage = 1;
  itemsPerPage = 10;
  sortBy: 'latest' | 'popular' | 'editorsPick' = 'latest';

  get articles() {
    const result = this.articleService.getArticles(
      this.currentPage,
      this.itemsPerPage,
      this.sortBy,
      this.searchQuery
    );
    return result.articles;
  }

  get featuredArticles() {
    return this.articleService.getArticles(1, 3, 'editorsPick').articles;
  }

  get totalPages() {
    const result = this.articleService.getArticles(
      1,
      this.itemsPerPage,
      this.sortBy,
      this.searchQuery
    );
    return Math.ceil(result.total / this.itemsPerPage);
  }

  onSearch() {
    this.currentPage = 1;
  }

  changeSort(sort: 'latest' | 'popular' | 'editorsPick') {
    this.sortBy = sort;
    this.currentPage = 1;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}