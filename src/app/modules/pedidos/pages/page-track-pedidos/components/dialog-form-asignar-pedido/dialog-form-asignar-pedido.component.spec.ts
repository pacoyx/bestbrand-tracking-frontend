import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormAsignarPedidoComponent } from './dialog-form-asignar-pedido.component';

describe('DialogFormAsignarPedidoComponent', () => {
  let component: DialogFormAsignarPedidoComponent;
  let fixture: ComponentFixture<DialogFormAsignarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFormAsignarPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFormAsignarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
