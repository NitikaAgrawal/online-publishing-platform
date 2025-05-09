import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from '../article-card.component';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-featured-articles',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent],
  templateUrl: './featured-articles.component.html',
  styleUrls: ['./featured-articles.component.scss']
})
export class FeaturedArticlesComponent {
  private articleService = inject(ArticleService);

  get featuredArticles() {
    return this.articleService.getArticles(1, 3, 'editorsPick').articles;
  }
}