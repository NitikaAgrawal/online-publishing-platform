import { Author } from './author';
import { Comment } from './comment';
export interface Article {
    id: string;
    title: string;
    content: string;
    thumbnail?: string;
    description: string;
    authorId: string;
    author?: Author; 
    publishDate: Date;
    isFeatured: boolean;
    isEditorsPick: boolean;
    views: number;
    likes: number;
    tags: string[];
    category?: string;  
    status: string;
    scheduledDate?: Date;
     comments?: Comment[];

  }



  
  
  
 