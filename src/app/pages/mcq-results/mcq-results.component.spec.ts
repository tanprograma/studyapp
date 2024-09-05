import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McqResultsComponent } from './mcq-results.component';

describe('McqResultsComponent', () => {
  let component: McqResultsComponent;
  let fixture: ComponentFixture<McqResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McqResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McqResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
