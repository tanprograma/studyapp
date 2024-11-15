import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ARTICLE_STORE } from '../../store/article.store';
import { MatButtonModule } from '@angular/material/button';
import { APP_STATE } from '../../store/app.store';
import { MatIconModule } from '@angular/material/icon';
import { ReloaderComponent } from '../../components/reloader/reloader.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, ReloaderComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesComponent {
  store = inject(ARTICLE_STORE);
  appState = inject(APP_STATE);
  ngOnInit(): void {}

  async getArticles() {
    this.appState.setLoadState(true);
    await this.store.articlePreviews();
    this.appState.setLoadState(false);
  }
}
