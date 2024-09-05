import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McqResComponent } from './mcq-res.component';

describe('McqResComponent', () => {
  let component: McqResComponent;
  let fixture: ComponentFixture<McqResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McqResComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McqResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
