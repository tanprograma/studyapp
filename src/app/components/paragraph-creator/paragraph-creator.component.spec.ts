import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphCreatorComponent } from './paragraph-creator.component';

describe('ParagraphCreatorComponent', () => {
  let component: ParagraphCreatorComponent;
  let fixture: ComponentFixture<ParagraphCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParagraphCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParagraphCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
