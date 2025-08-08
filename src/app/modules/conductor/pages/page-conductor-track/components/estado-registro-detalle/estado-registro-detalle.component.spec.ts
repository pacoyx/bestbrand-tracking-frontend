import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoRegistroDetalleComponent } from './estado-registro-detalle.component';

describe('EstadoRegistroDetalleComponent', () => {
  let component: EstadoRegistroDetalleComponent;
  let fixture: ComponentFixture<EstadoRegistroDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoRegistroDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoRegistroDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
