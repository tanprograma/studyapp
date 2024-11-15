import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloaderComponent } from './reloader.component';

describe('ReloaderComponent', () => {
  let component: ReloaderComponent;
  let fixture: ComponentFixture<ReloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReloaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
