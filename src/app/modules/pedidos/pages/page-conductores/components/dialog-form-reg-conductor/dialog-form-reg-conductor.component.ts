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
import { ICreateConductorRequest, IListarConductoresPaginadoResponse, IUpdateConductorRequest } from '../../../../interfaces/IConductor';
import { IResponseGeneric } from '../../../../../../core/interfaces/ICommons';
import { MatCardModule } from '@angular/material/card';
import { FormErrorsComponent } from '../../../../../../core/components/form-errors/form-errors.component';

@Component({
  selector: 'app-dialog-form-reg-conductor',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatDialogActions, MatDialogTitle,
    MatDialogContent, MatIconModule, MatCardModule,
    MatButtonModule, MatSelectModule, FormErrorsComponent
  ],
  templateUrl: './dialog-form-reg-conductor.component.html',
  styleUrl: './dialog-form-reg-conductor.component.css'
})
export class DialogFormRegConductorComponent implements OnInit, OnDestroy {
  readonly data = inject<{ esNuevo: boolean, objConductor: IListarConductoresPaginadoResponse }>(MAT_DIALOG_DATA);
  pedidosService = inject(PedidosmntService);
  conductorForm: FormGroup;
  loadingSave = false;
  titulo = this.data.esNuevo ? 'Registrar Conductor' : 'Actualizar Conductor';
  pedidoServiceSuscripcion!: Subscription;


  conductorErrorMessages = {
    nombre: { required: 'El nombre es obligatorio.' },
    licencia: { required: 'La licencia es obligatoria.' },
    docIdentidad: { required: 'El documento de identidad es obligatorio.' },
    telefono: { required: 'El teléfono es obligatorio.' },
    email: { required: 'El email es obligatorio.', email: 'El email no es válido.' },
    empTransRuc: { required: 'El número RUC es obligatorio.' },
    empTransNombre: { required: 'La empresa de transporte es obligatoria.' },
    estado: { required: 'El estado es obligatorio.' }
  };


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogFormRegConductorComponent>,
  ) {
    this.conductorForm = this.fb.group({
      id: 0,
      nombre: ['', Validators.required],
      licencia: '',
      telefono: '',
      email: ['', Validators.email],
      estado: ['', Validators.required],
      docIdentidad: '',
      empTransNombre: '',
      empTransRuc: ''
    });
  }

  ngOnInit(): void {
    this.conductorForm.reset();
    if (this.data.esNuevo) {
      this.conductorForm.patchValue({ estado: 'A' });
    } else {
      this.conductorForm.patchValue(this.data.objConductor);
    }
  }

  ngOnDestroy(): void {
    if (this.pedidoServiceSuscripcion) {
      this.pedidoServiceSuscripcion.unsubscribe();
    }
  }

  onSubmit(): void {
    console.log('Form Value:', this.conductorForm.value);



    if (this.conductorForm.invalid) {
      console.log('Form is invalid');
      Object.keys(this.conductorForm.controls).forEach(field => {
        const control = this.conductorForm.get(field);
        if (control && control.invalid) {
          const errors = control.errors;
          console.log(`Error en el campo "${field}":`, errors);
        }
      });

      return;
    }

    const ConductorData = this.conductorForm.value;
    const conductorDataCreate: any = ConductorData;
    const conductorDataUpdate: any = ConductorData;


    this.loadingSave = true;

    const request$: Observable<IResponseGeneric<ICreateConductorRequest> | IResponseGeneric<IUpdateConductorRequest>> = this.data.esNuevo
      ? this.pedidosService.createConductor(conductorDataCreate)
      : this.pedidosService.updateConductor(conductorDataUpdate);

    this.pedidoServiceSuscripcion = request$.subscribe({
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