import { Component, Input } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { IPedidoRegistros } from '../../../../interfaces/IOperaciones';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-estado-registro-detalle',
  standalone: true,
  imports: [MatStepperModule, DatePipe],
  templateUrl: './estado-registro-detalle.component.html',
  styleUrl: './estado-registro-detalle.component.css',
})
export class EstadoRegistroDetalleComponent {
  @Input() registros: IPedidoRegistros[] = [];   
  isLinear = false;

  
}
