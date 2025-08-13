import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAsignarPedidoComponent } from './page-asignar-pedido.component';

describe('PageAsignarPedidoComponent', () => {
  let component: PageAsignarPedidoComponent;
  let fixture: ComponentFixture<PageAsignarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageAsignarPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAsignarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
