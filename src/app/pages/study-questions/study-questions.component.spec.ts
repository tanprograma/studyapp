import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyQuestionsComponent } from './study-questions.component';

describe('StudyQuestionsComponent', () => {
  let component: StudyQuestionsComponent;
  let fixture: ComponentFixture<StudyQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
