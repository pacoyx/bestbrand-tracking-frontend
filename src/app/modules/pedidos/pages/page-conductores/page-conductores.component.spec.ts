import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageConductoresComponent } from './page-conductores.component';

describe('PageConductoresComponent', () => {
  let component: PageConductoresComponent;
  let fixture: ComponentFixture<PageConductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageConductoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
