import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces/article';

@Component({
  selector: 'article-render',
  standalone: true,
  imports: [],
  templateUrl: './article-render.component.html',
  styleUrl: './article-render.component.scss',
})
export class ArticleRenderComponent {
  @Input() article!: Article;
}
