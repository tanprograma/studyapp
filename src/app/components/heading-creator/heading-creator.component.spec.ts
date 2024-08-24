import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingCreatorComponent } from './heading-creator.component';

describe('HeadingCreatorComponent', () => {
  let component: HeadingCreatorComponent;
  let fixture: ComponentFixture<HeadingCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadingCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadingCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
