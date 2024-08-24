import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleQuoteCreatorComponent } from './article-quote-creator.component';

describe('ArticleQuoteCreatorComponent', () => {
  let component: ArticleQuoteCreatorComponent;
  let fixture: ComponentFixture<ArticleQuoteCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleQuoteCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleQuoteCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
