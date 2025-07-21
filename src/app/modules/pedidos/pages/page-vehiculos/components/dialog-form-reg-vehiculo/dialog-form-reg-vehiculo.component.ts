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
import { Observable, Subscription } from 'rxjs';
import { IResponseGeneric } from '../../../../../../core/interfaces/ICommons';
import { ICreateVehiculoRequest, IUpdateVehiculoRequest } from '../../../../interfaces/IVehiculo';
import { FormErrorsComponent } from '../../../../../../core/components/form-errors/form-errors.component';


@Component({
  selector: 'app-dialog-form-reg-vehiculo',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatDialogActions, MatDialogTitle,
    MatDialogContent, MatIconModule, FormErrorsComponent,
    MatButtonModule, MatSelectModule
  ],
  templateUrl: './dialog-form-reg-vehiculo.component.html',
  styleUrl: './dialog-form-reg-vehiculo.component.css'
})
export class DialogFormRegVehiculoComponent implements OnInit, OnDestroy {
  readonly data = inject<{ esNuevo: boolean, objProduct: any }>(MAT_DIALOG_DATA);
  pedidosService = inject(PedidosmntService);
  vehiculoForm: FormGroup;
  loadingSave = false;
  titulo = this.data.esNuevo ? 'Registrar Vehiculo' : 'Actualizar Vehiculo';
  vehiculoSuscripcion!: Subscription;


  conductorErrorMessages = {
    placa: { required: 'El numero de placa es obligatorio.' },    
    estado: { required: 'El estado es obligatorio.' }
  };


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogFormRegVehiculoComponent>,
  ) {
    this.vehiculoForm = this.fb.group({
      id: 0,
      placa: ['', Validators.required],
      marca: '',
      modelo: '',
      anio: 0,
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.vehiculoForm.reset();
    if (this.data.esNuevo) {
      this.vehiculoForm.patchValue({ estado: 'A' });
    } else {
      this.vehiculoForm.patchValue(this.data.objProduct);
    }
  }

  ngOnDestroy(): void {
    if (this.vehiculoSuscripcion) {
      this.vehiculoSuscripcion.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.vehiculoForm.invalid) {
      return;
    }

    const vehiculoData = this.vehiculoForm.value;
    const vehiculoDataCreate: any = vehiculoData;
    const vehiculoDataUpdate: any = vehiculoData;


    this.loadingSave = true;

    const request$: Observable<IResponseGeneric<ICreateVehiculoRequest> | IResponseGeneric<IUpdateVehiculoRequest>> = this.data.esNuevo
      ? this.pedidosService.createVehiculo(vehiculoDataCreate)
      : this.pedidosService.updateVehiculo(vehiculoDataUpdate);

    this.vehiculoSuscripcion = request$.subscribe({
      next: (resp) => {
        this.loadingSave = false;
        this.dialogRef.close(resp);
      },
      error: (err: any) => {
        console.log(err);
        this.loadingSave = false;
      }
    });
  }


  onCancel(): void {
    this.dialogRef.close();
  }
}
