import { Injectable, signal } from '@angular/core';
import { Article } from '../interfaces/article';
import { Author } from '../interfaces/author';
import { mockAuthors } from '../mocks/authors.mock';
import { mockArticles } from '../mocks/articles.mock';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles = signal<Article[]>(mockArticles.map(article => ({
    ...article,
    comments: article.comments || [] 
  })));
  private authors = signal<Author[]>(mockAuthors);

  getArticle(id: string): Article | undefined {
    return this.articles().find(article => article.id === id);
  }

  incrementViews(articleId: string): void {
    this.articles.update(articles => 
      articles.map(article => {
        if (article.id === articleId) {
          return { ...article, views: (article.views || 0) + 1 };
        }
        return article;
      })
    );
  }

  getArticles(
    page: number = 1,
    pageSize: number = 10,
    sortBy: 'latest' | 'popular' | 'editorsPick' = 'latest',
    searchQuery: string = ''
  ) {
    let filtered = this.articles();

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    let sorted = [...filtered];
    switch (sortBy) {
      case 'latest':
        sorted.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
        break;
      case 'popular':
        sorted.sort((a, b) => b.views - a.views);
        break;
      case 'editorsPick':
        sorted = sorted.filter(a => a.isEditorsPick);
        break;
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      articles: sorted.slice(start, end),
      total: sorted.length,
      featured: sorted.filter(a => a.isFeatured)
    };
  }

  likeComment(articleId: string, commentId: string) {
    this.articles.update(articles => 
      articles.map(article => {
        if (article.id === articleId) {
          const updatedComments = article.comments?.map(comment => {
            if (comment.id === commentId) {
              return { ...comment, likes: (comment.likes || 0) + 1 };
            }
            return comment;
          }) || [];
          return { ...article, comments: updatedComments };
        }
        return article;
      })
    );
  }
  
  getAuthor(authorId: string) {
    return this.authors().find(a => a.id === authorId);
  }
  
  getAuthors() {
    return this.authors().map(author => ({
      ...author,
      articleCount: this.articles().filter(a => a.authorId === author.id).length
    }));
  }

  getArticlesByAuthor(authorId: string) {
    return this.articles().filter(a => a.authorId === authorId);
  }
  
  getArticlesWithAuthors() {
    return this.articles().map(article => {
      return {
        ...article,
        author: this.getAuthor(article.authorId) // Add author object to each article
      };
    });
  }

  getRelatedArticles(articleId: string, limit: number = 3) {
    const article = this.getArticle(articleId);
    if (!article) return [];
    
    return this.articles()
      .filter(a => a.id !== articleId && a.tags.some(tag => article.tags.includes(tag)))
      .slice(0, limit);
  }

  addComment(articleId: string, comment: Omit<Comment, 'id' | 'createdAt'>) {
    this.articles.update(articles => 
      articles.map(article => {
        if (article.id === articleId) {
          const newComment: Comment = {
            ...comment,
            id: `comment-${Date.now()}`,
            createdAt: new Date()
          };
          return {
            ...article,
            comments: [...(article.comments || []), newComment]
          };
        }
        return article;
      })
    );
  }

  createArticle(article: Omit<Article, 'id' | 'publishDate' | 'views' | 'likes' | 'comments'>) {
    const newArticle: Article = {
      ...article,
      id: `article-${Date.now()}`,
      publishDate: new Date(),
      views: 0,
      likes: 0,
      status: article.status || 'published',
      comments: [],
      category: article.category || ''
    };
    
    this.articles.update(articles => [...articles, newArticle]);
    return newArticle;
  }
  
  getPopularTags(limit: number = 10) {
    const tagCounts: Record<string, number> = {};
    
    this.articles().forEach(article => {
      article.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([tag]) => tag);
  }
}