import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTakeComponent } from './question-take.component';

describe('QuestionTakeComponent', () => {
  let component: QuestionTakeComponent;
  let fixture: ComponentFixture<QuestionTakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionTakeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionTakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
