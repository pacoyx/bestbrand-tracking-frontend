import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTrackPedidosComponent } from './page-track-pedidos.component';

describe('PageTrackPedidosComponent', () => {
  let component: PageTrackPedidosComponent;
  let fixture: ComponentFixture<PageTrackPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTrackPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTrackPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
