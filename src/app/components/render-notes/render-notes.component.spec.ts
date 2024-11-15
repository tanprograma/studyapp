import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderNotesComponent } from './render-notes.component';

describe('RenderNotesComponent', () => {
  let component: RenderNotesComponent;
  let fixture: ComponentFixture<RenderNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
