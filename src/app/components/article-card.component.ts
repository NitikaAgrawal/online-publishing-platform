import { Component, Input } from '@angular/core';
import { Article } from '../interfaces/article';
import { Author } from '../interfaces/author';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [DatePipe, RouterLink, CommonModule],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() article!: Article;
  @Input() showAuthor: boolean = true;
  @Input() author?: Author;
}