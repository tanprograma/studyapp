import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudyquestionsComponent } from './create-studyquestions.component';

describe('CreateStudyquestionsComponent', () => {
  let component: CreateStudyquestionsComponent;
  let fixture: ComponentFixture<CreateStudyquestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStudyquestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStudyquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
