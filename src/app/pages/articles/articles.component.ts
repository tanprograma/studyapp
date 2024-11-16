import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ARTICLE_STORE } from '../../store/article.store';
import { MatButtonModule } from '@angular/material/button';
import { APP_STATE } from '../../store/app.store';
import { MatIconModule } from '@angular/material/icon';
import { ReloaderComponent } from '../../components/reloader/reloader.component';
import { LoadIndicatorComponent } from '../../components/load-indicator/load-indicator.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    ReloaderComponent,
    LoadIndicatorComponent,
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesComponent {
  store = inject(ARTICLE_STORE);
  appState = inject(APP_STATE);
  ngOnInit(): void {
    console.log('running articles');
    this.getArticles().then((res) => console.log('fetched articles'));
  }

  async getArticles() {
    await this.store.articlePreviews();
  }
  async getLatestArticle() {}
}
