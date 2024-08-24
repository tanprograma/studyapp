import { Component, inject } from '@angular/core';
import { ArticleRenderComponent } from '../../components/article-render/article-render.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { Article, ArticleContent } from '../../interfaces/article';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { ArticleService } from '../../services/article.service';
import { ParagraphCreatorComponent } from '../../components/paragraph-creator/paragraph-creator.component';
import { ListCreatorComponent } from '../../components/list-creator/list-creator.component';
import { HeadingCreatorComponent } from '../../components/heading-creator/heading-creator.component';
import { PromptConfirmComponent } from '../../components/prompt-confirm/prompt-confirm.component';
import { ArticleQuoteCreatorComponent } from '../../components/article-quote-creator/article-quote-creator.component';
type Tool =
  | 'title'
  | 'paragraph'
  | 'olist'
  | 'ulist'
  | 'heading'
  | 'quote'
  | 'preview'
  | 'save';
@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [
    ArticleRenderComponent,
    LoaderComponent,
    ReactiveFormsModule,
    ParagraphCreatorComponent,
    ListCreatorComponent,
    HeadingCreatorComponent,
    PromptConfirmComponent,
    ArticleQuoteCreatorComponent,
  ],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent {
  articleService = inject(ArticleService);
  http = inject(HttpService);
  items: Article[] = [];
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    title: ['create new title on <em>creation tools</em>', Validators.required],
  });
  content: ArticleContent[] = [];
  loading = false;
  tool: Tool = 'preview';
  selectTool(tool: Tool) {
    this.tool = tool;
  }
  prompt = false;
  preSave() {
    this.prompt = true;
  }
  save(event: boolean) {
    this.prompt = false;
    if (!event) {
      return;
    }

    this.loading = true;
    this.articleService
      .post({
        title: this.form.value.title ?? '',
        content: this.content,
      })
      .subscribe((result) => {
        if (result != undefined) {
          this.items.push(result);
        }
        this.loading = false;
      });
    this.reset();
  }
  onCreate(value: ArticleContent) {
    this.content.push(value);
    this.selectTool('preview');
  }
  reset() {
    this.form.patchValue({
      title: '',
    });
    this.content = [];
  }
}
