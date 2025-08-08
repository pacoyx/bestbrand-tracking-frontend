import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTablaPedidosComponent } from './card-tabla-pedidos.component';

describe('CardTablaPedidosComponent', () => {
  let component: CardTablaPedidosComponent;
  let fixture: ComponentFixture<CardTablaPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTablaPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTablaPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
