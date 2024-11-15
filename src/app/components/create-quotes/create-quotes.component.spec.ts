import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuotesComponent } from './create-quotes.component';

describe('CreateQuotesComponent', () => {
  let component: CreateQuotesComponent;
  let fixture: ComponentFixture<CreateQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQuotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
