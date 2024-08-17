import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotecreatorComponent } from './notecreator.component';

describe('NotecreatorComponent', () => {
  let component: NotecreatorComponent;
  let fixture: ComponentFixture<NotecreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotecreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotecreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
