import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Article } from '../interfaces/article';
import { ArticleService } from '../services/article.service';
import { inject } from '@angular/core';
type ArticleStoreState = {
  articles: Pick<Article, '_id' | 'title' | 'createdAt'>[];
  article: Article | null;
  loading: boolean;
  initialized: boolean;
};
const initialState: ArticleStoreState = {
  articles: [],
  article: null,
  loading: false,
  initialized: false,
};
export const ARTICLE_STORE = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, articleService = inject(ArticleService)) => ({
    initializeStore() {
      patchState(store, { initialized: true });
    },
    async articlePreviews() {
      const articles = await articleService.articlePreviews();
      if (articles.length == 0) return;
      patchState(store, { articles: articles });
    },
    async getArticle(id: string) {
      patchState(store, { loading: true });
      const article = await articleService.getArticle(id);
      patchState(store, { article: article });
      patchState(store, { loading: false });
    },
    async addArticle(payload: Partial<Article>) {
      patchState(store, { loading: true });
      const { _id, title, createdAt } = await articleService.addArticle(
        payload
      );
      patchState(store, ({ articles, loading }) => ({
        articles: [...articles, { _id, title, createdAt }],
        loading: false,
      }));
    },
  }))
);
