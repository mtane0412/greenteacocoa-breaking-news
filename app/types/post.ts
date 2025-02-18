export interface Post {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
}

export type CreatePost = Pick<Post, "content">;