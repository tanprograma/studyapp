import { Component, inject, OnInit } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { Article } from '../../interfaces/article';
import { ActivatedRoute } from '@angular/router';
import { ARTICLE_STORE } from '../../store/article.store';

@Component({
  selector: 'articles-view',
  standalone: true,
  imports: [ArticleComponent],
  templateUrl: './articles-view.component.html',
  styleUrl: './articles-view.component.scss',
})
export class ArticlesViewComponent implements OnInit {
  route = inject(ActivatedRoute);
  store = inject(ARTICLE_STORE);

  ngOnInit(): void {
    this.getArticle().then((res) => console.log('fetched the article'));
  }
  async getArticle() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    await this.store.getArticle(id);
  }
}
