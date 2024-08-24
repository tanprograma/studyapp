import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleRenderComponent } from './article-render.component';

describe('ArticleRenderComponent', () => {
  let component: ArticleRenderComponent;
  let fixture: ComponentFixture<ArticleRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleRenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
