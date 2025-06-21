import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPedidosComponent } from './layout-pedidos.component';

describe('LayoutPedidosComponent', () => {
  let component: LayoutPedidosComponent;
  let fixture: ComponentFixture<LayoutPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
