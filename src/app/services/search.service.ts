import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private worker: Worker;

  searchResults$ = new Subject<any[]>();

  constructor() {
    this.worker = new Worker(new URL('../workers/search.worker', import.meta.url));
    this.worker.onmessage = ({ data }) => {
      if (data.type === 'SEARCH_RESULTS') {
        this.searchResults$.next(data.results);
      }
    };
  }

  searchArticles(articles: any[], query: string): void {
    this.worker.postMessage({
      type: 'SEARCH_ARTICLES',
      articles,
      query
    });
  }
}