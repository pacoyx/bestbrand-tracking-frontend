import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutConductorComponent } from './layout-conductor.component';

describe('LayoutConductorComponent', () => {
  let component: LayoutConductorComponent;
  let fixture: ComponentFixture<LayoutConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutConductorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
