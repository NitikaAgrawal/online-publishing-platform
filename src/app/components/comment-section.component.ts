import { Component, Input, inject } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent {
  private articleService = inject(ArticleService);
  private authService = inject(AuthService);

  @Input() articleId!: string;
  newComment = '';
  sortBy: 'newest' | 'oldest' | 'popular' = 'newest';

  get comments() {
    const article = this.articleService.getArticle(this.articleId);
    if (!article?.comments) return [];
    
    return [...article.comments].sort((a, b) => {
      if (this.sortBy === 'newest') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else if (this.sortBy === 'oldest') {
        return a.createdAt.getTime() - b.createdAt.getTime();
      } else {
        return b.likes - a.likes;
      }
    });
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  addComment() {
    if (this.newComment.trim() && this.currentUser) {
      this.articleService.addComment(this.articleId, {
        authorId: this.currentUser.id,
        content: this.newComment,
        likes: 0, 
        articleId: this.articleId
      });
      this.newComment = '';
    }
  }

  likeComment(commentId: string) {
    this.articleService.likeComment(this.articleId, commentId);
  }
}