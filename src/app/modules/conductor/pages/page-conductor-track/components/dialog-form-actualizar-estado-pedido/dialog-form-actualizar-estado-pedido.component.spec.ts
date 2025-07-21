import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormActualizarEstadoPedidoComponent } from './dialog-form-actualizar-estado-pedido.component';

describe('DialogFormActualizarEstadoPedidoComponent', () => {
  let component: DialogFormActualizarEstadoPedidoComponent;
  let fixture: ComponentFixture<DialogFormActualizarEstadoPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFormActualizarEstadoPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFormActualizarEstadoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
