import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McqMarkingComponent } from './mcq-marking.component';

describe('McqMarkingComponent', () => {
  let component: McqMarkingComponent;
  let fixture: ComponentFixture<McqMarkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McqMarkingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McqMarkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
