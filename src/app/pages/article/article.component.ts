import { Component, inject } from '@angular/core';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ArticleRenderComponent } from '../../components/article-render/article-render.component';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import { PromptConfirmComponent } from '../../components/prompt-confirm/prompt-confirm.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    RouterLink,
    LoaderComponent,
    ArticleRenderComponent,
    FontAwesomeModule,
    PromptConfirmComponent,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  leftArrow = faAngleDoubleLeft;
  rightArrow = faAngleDoubleRight;
  route = inject(Router);
  articleService = inject(ArticleService);
  all_Items: Article[] = [];
  loading = true;
  tool: string = 'all';
  items: Article[] = [];
  paginated: { start_index: number; articles: Article[] } = {
    start_index: 0,
    articles: [],
  };

  article!: Article;
  toggleTool(v: string) {
    this.tool = v;
  }
  ngOnInit(): void {
    this.loading = true;
    this.articleService.getAll().subscribe((res) => {
      this.all_Items = res.sort(this.sortTime);
      this.paginateForward();
      this.article = this.paginated.articles[0];
      this.loading = false;
    });
  }
  // implements pagination of shown articles
  paginateForward() {
    let count = 0;
    for (
      let i = this.paginated.start_index;
      i < this.paginated.start_index + 5;
      i++
    ) {
      if (this.all_Items[i] != undefined) {
        this.paginated.articles.push(this.all_Items[i]);
        count++;
      }
    }
    this.paginated.start_index = count;
  }
  paginateBackward() {
    if (this.paginated.start_index <= 4) return;
    let count = this.paginated.start_index - 1;
    for (
      let i = this.paginated.start_index;
      i > this.paginated.start_index - 5;
      i--
    ) {
      if (this.all_Items[count] != undefined) {
        this.paginated.articles.push(this.all_Items[count]);
        count--;
      }
    }
    this.paginated.start_index = count;
  }
  selectArticle(title: string) {
    const article = this.all_Items.find((article) => {
      return article.title == title;
    });
    // console.log(article);
    if (article == undefined) return;
    if (article != undefined) {
      this.article = article;
      this.items = [];
      this.tool = 'date';
      // this.articleService.article.set(article);
      // this.route.navigate(['/articles/read']);
    }
  }
  search(e: Event) {
    // const target = e.target as HTMLInputElement;
    // this.items = this.all_Items.filter((item) => {
    //   return (
    //     new Date(item.createdAt as string).toLocaleDateString() ==
    //     new Date(target.value).toLocaleDateString()
    //   );
    // });
  }
  searchAll() {
    this.tool = 'all';
    this.items = this.all_Items;
  }
  searchDate(e: Event) {
    this.clearArticles();
    const target = e.target as HTMLInputElement;

    this.items = this.all_Items
      .filter((item) => {
        return (
          new Date(item.createdAt as string).toLocaleDateString() ==
          new Date(target.value).toLocaleDateString()
        );
      })
      .sort(this.sortTime);
    // console.log(this.items);
  }
  searchAuthor(e: Event) {
    this.clearArticles();
    // tobe implemented
    // this.tool = 'all';
    // this.items = this.all_Items;
  }
  searchTitle(e: Event) {
    this.clearArticles();
    const target = e.target as HTMLInputElement;
    this.items = this.all_Items
      .filter((item) => {
        return item.title.includes(target.value);
      })
      .sort(this.sortTime);
  }
  clearArticles() {
    this.items = [];
    this.tool = '';
  }
  sortTime(a: Article, b: Article) {
    if (new Date(a.createdAt as string) > new Date(b.createdAt as string)) {
      return 1;
    }
    if (new Date(a.createdAt as string) < new Date(b.createdAt as string)) {
      return -1;
    }
    return 0;
  }
}
