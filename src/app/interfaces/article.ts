export interface Article {
  _id: string;
  title: { main: string; sub: string };
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}
