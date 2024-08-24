export interface Article {
  title: string;
  content: ArticleContent[];
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}
export interface ArticleContent {
  format: string;
  composition: any;
}
export interface Paragraph {
  value: string;
}
export interface list {
  description?: string;
  ordered: boolean;
  value: string[];
}
export interface Heading {
  value: string;
}
