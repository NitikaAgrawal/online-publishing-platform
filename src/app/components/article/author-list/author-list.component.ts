import { Component, inject } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule,TruncatePipe ],
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent {
  public articleService = inject(ArticleService);

  searchQuery = '';
  
  get authors() {
    const allAuthors = this.articleService.getAuthors();
    if (!this.searchQuery) return allAuthors;
    
    return allAuthors.filter(author => 
      author.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
