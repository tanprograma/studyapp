import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalMenuComponent } from './normal-menu.component';

describe('NormalMenuComponent', () => {
  let component: NormalMenuComponent;
  let fixture: ComponentFixture<NormalMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormalMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
