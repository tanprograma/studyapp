import { Component, inject, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../interfaces/article';
import { PromptConfirmComponent } from '../../components/prompt-confirm/prompt-confirm.component';

@Component({
  selector: 'app-manage-articles',
  standalone: true,
  imports: [PromptConfirmComponent],
  templateUrl: './manage-articles.component.html',
  styleUrl: './manage-articles.component.scss',
})
export class ManageArticlesComponent implements OnInit {
  loading = false;
  articleService = inject(ArticleService);
  items: Article[] = [];
  ngOnInit(): void {
    this.loading = true;
    this.articleService.getAll().subscribe((articles) => {
      this.items = articles;
      this.loading = false;
    });
  }
}
