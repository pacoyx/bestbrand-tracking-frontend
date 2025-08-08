import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PedidosmntService } from '../../../../services/pedidosmnt.service';
import { IGetPedidosResponse, IPedidoAsignarRequest } from '../../../../interfaces/IPedidoTrack';
import { Subscription } from 'rxjs';
import { IGetEmpresasTransporteToHelpResponse } from '../../../../interfaces/IEmpresaTransporte';
import { IGetConductoresToHelpResponse } from '../../../../../administracion/interfaces/IUser';
import { IGetVehiculosToHelpResponse } from '../../../../interfaces/IVehiculo';

@Component({
  selector: 'app-dialog-form-asignar-pedido',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatDialogActions, MatDialogTitle,
    MatDialogContent, MatIconModule, 
    MatButtonModule, MatSelectModule],
  templateUrl: './dialog-form-asignar-pedido.component.html',
  styleUrl: './dialog-form-asignar-pedido.component.css'
})
export class DialogFormAsignarPedidoComponent implements OnInit, OnDestroy {

  asignarErrorMessages = {
    prioridad: { required: 'El numero de prioridad es obligatorio.' },
    empresa: { required: 'El nombre de empresa es obligatorio.' },
    conductor: { required: 'El conductor es obligatorio.' },
    vehiculo: { required: 'El vehiculo es obligatorio.' },
    estado: { required: 'El estado es obligatorio.' }
  };

  prioridades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  readonly data = inject<{ 
      esNuevo: boolean, 
      objPedido: IGetPedidosResponse, 
      objEmpresas: IGetEmpresasTransporteToHelpResponse[], 
      objConductores: IGetConductoresToHelpResponse[], 
      objVehiculos: IGetVehiculosToHelpResponse[] }>(MAT_DIALOG_DATA);
  pedidosService = inject(PedidosmntService);
  loadingSave = false;
  asignarForm: FormGroup;
  titulo = 'Asignar Conductor';
  regAsignacionSuscripcion!: Subscription;
  displayNroPedido: string = '000-000000';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogFormAsignarPedidoComponent>,
  ) {
    this.asignarForm = this.fb.group({
      id: 0,
      prioridad: [0, Validators.required],
      empresa: ['', Validators.required],
      conductor: ['', Validators.required],
      vehiculo: ['', Validators.required],      
      comentarios: ['']
    });
  }

  ngOnInit(): void {    
    this.displayNroPedido = this.data.objPedido.numero;
    this.asignarForm.patchValue({
      id: this.data.objPedido.id,
      prioridad: this.data.objPedido.prioridad,
      empresa: this.data.objPedido.empresaTransporteId,
      conductor: this.data.objPedido.conductorId,
      vehiculo: this.data.objPedido.vehiculoId,
      comentarios: this.data.objPedido.comentarios
    });
  }

  ngOnDestroy(): void {
    if (this.regAsignacionSuscripcion) {
      this.regAsignacionSuscripcion.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.asignarForm.invalid) {
      return;
    }

    const asignacionData = this.asignarForm.value;    
    this.loadingSave = true;
    
    // Obtener el texto seleccionado del select de empresa
    const empresaObj = this.data.objEmpresas.find(e => e.id === asignacionData.empresa);
    const conductorObj = this.data.objConductores.find(c => c.id === asignacionData.conductor);
    const vehiculoObj = this.data.objVehiculos.find(v => v.id === asignacionData.vehiculo);

    let req: IPedidoAsignarRequest = {
      transConductor: conductorObj ? conductorObj.nombre : '',
      transEmpresa: empresaObj ? empresaObj.razonSocial : '',
      transVehiculo: vehiculoObj ? vehiculoObj.placa : '',
      estadoPedido: 'ASIGNADO',
      prioridad: asignacionData.prioridad,
      conductorId: asignacionData.conductor,
      vehiculoId: asignacionData.vehiculo,
      empresaTransporteId: asignacionData.empresa,
      comentarios: asignacionData.comentarios
    }

    this.regAsignacionSuscripcion = this.pedidosService.asignarPedido(asignacionData.id, req).subscribe({
      next: (resp) => {
        this.loadingSave = false;
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        console.log(err);
        this.loadingSave = false;
      }
    });
  }


  onCancel(): void {
    this.dialogRef.close(false);
  }

}
