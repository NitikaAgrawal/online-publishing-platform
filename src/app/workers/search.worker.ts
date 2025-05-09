// src/app/workers/search.worker.ts

/// <reference lib="webworker" />

// Define the message type for TypeScript type checking
type WorkerMessage = {
    type: 'SEARCH_ARTICLES';
    articles: any[];
    query: string;
  };
  
  // Function to perform the search
  function performSearch(articles: any[], query: string): any[] {
    if (!query || query.trim() === '') {
      return articles; // Return all articles if query is empty
    }
  
    const lowerQuery = query.toLowerCase();
    
    return articles.filter(article => {
      // Search in title
      if (article.title.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      
      // Search in description
      if (article.description.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      
      // Search in author name
      if (article.author?.name.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      
      // Search in tags
      if (article.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery))) {
        return true;
      }
      
      return false;
    });
  }
  
  // Listen for messages from the main thread
  addEventListener('message', ({ data }: { data: WorkerMessage }) => {
    if (data.type === 'SEARCH_ARTICLES') {
      const results = performSearch(data.articles, data.query);
      
      // Send the results back to the main thread
      postMessage({
        type: 'SEARCH_RESULTS',
        results: results
      });
    }
  });