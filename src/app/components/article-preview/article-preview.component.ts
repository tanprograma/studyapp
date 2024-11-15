import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Article } from '../../interfaces/article';

@Component({
  selector: 'article-preview',
  standalone: true,
  imports: [],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ArticlePreviewComponent {
  @Input() article!: Pick<Article, 'content'>;
  // serves to display the edit View of the article,
}
