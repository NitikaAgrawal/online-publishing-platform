import { Component, inject } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { CommentSectionComponent } from '../../comment-section.component';
@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink, CommentSectionComponent],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent {
  private articleService = inject(ArticleService);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  articleId = this.route.snapshot.paramMap.get('id');
  article = this.articleService.getArticle(this.articleId!);
  author = this.article ? this.articleService.getAuthor(this.article.authorId) : null;
  relatedArticles = this.article ? this.articleService.getRelatedArticles(this.article.id) : [];
  currentUser = this.authService.getCurrentUser();

  ngOnInit() {
    if (this.article) {
      this.articleService.incrementViews(this.article.id);
    }
    
  }
}
