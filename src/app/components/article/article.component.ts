import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Article } from '../../interfaces/article';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'article',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent {
  @Input() article!: Article | null;
}
