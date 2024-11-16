import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ArticleComponent } from '../article/article.component';
import { MatButtonModule } from '@angular/material/button';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';

import { Article } from '../../interfaces/article';
import { MatIconModule } from '@angular/material/icon';
import { ARTICLE_STORE } from '../../store/article.store';
import { USER_STATE } from '../../store/user.store';
import { LoadIndicatorComponent } from '../load-indicator/load-indicator.component';

@Component({
  selector: 'create-article',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ArticleComponent,
    MatButtonModule,
    ArticlePreviewComponent,
    MatIconModule,
    LoadIndicatorComponent,
  ],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent {
  formBuilder = inject(FormBuilder);
  store = inject(ARTICLE_STORE);
  userStore = inject(USER_STATE);
  form = this.formBuilder.group({
    article: ['', Validators.required],
    main: ['', Validators.required],
    sub: [''],
  });

  view: 'edit' | 'preview' = 'edit';
  toggleView(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    console.log(this.store.loading());
    this.view = this.view == 'edit' ? 'preview' : 'edit';
  }
  async saveArticle() {
    await this.store.addArticle(this.prepareArticle());
    this.clearArticle();
  }
  prepareArticle(): Pick<Article, 'author' | 'content' | 'title'> {
    return {
      author: ``,
      content: this.form.value.article ?? '',
      title: {
        main: this.form.value.main ?? '',
        sub: this.form.value.sub ?? '',
      },
    };
  }
  clearArticle() {
    this.form.patchValue({
      article: '',
      main: '',
      sub: '',
    });
  }
}
