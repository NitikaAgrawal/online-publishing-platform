import { Author } from './author';
export interface Comment {
  id: string;
  articleId: string;
  authorId: string;
  author?: {
    id: string;
    name: string;
    profilePicture?: string;
  };
  content: string;
  createdAt: Date;
  likes: number;
  parentCommentId?: string;
}