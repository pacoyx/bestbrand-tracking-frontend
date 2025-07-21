import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Observable, Subscription } from 'rxjs';
import { IResponseGeneric } from '../../../../../../core/interfaces/ICommons';
import { FormErrorsComponent } from '../../../../../../core/components/form-errors/form-errors.component';
import { AdminModService } from '../../../../services/admin-mod.service';
import { ICreateEmpresaTransporteRequest, ICreateEmpresaTransporteResponse, IUpdateEmpresaTransporteRequest } from '../../../../../pedidos/interfaces/IEmpresaTransporte';


@Component({
  selector: 'app-dialog-form-empresa',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatDialogActions, MatDialogTitle,
    MatDialogContent, MatIconModule, FormErrorsComponent,
    MatButtonModule, MatSelectModule],
  templateUrl: './dialog-form-empresa.component.html',
  styleUrl: './dialog-form-empresa.component.css'
})
export class DialogFormEmpresaComponent implements OnInit, OnDestroy {
  readonly data = inject<{ esNuevo: boolean, objEmpresa: any }>(MAT_DIALOG_DATA);
  adminOfService = inject(AdminModService);
  empresaForm: FormGroup;
  loadingSave = false;
  titulo = this.data.esNuevo ? 'Registrar Empresa' : 'Actualizar Empresa';
  empresaSuscripcion!: Subscription;

  empresaErrorMessages = {
    ruc: { required: 'El RUC es obligatorio.' },
    razonSocial: { required: 'La razón social es obligatoria.' },
    direccion: { required: 'La dirección es obligatoria.' },
    telefono: { required: 'El teléfono es obligatorio.' },
    email: { required: 'El email es obligatorio.' },
    estado: { required: 'El estado es obligatorio.' }
  };


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogFormEmpresaComponent>,
  ) {
    this.empresaForm = this.fb.group({
      id: 0,
      ruc: ['', Validators.required],
      razonSocial: ['', Validators.required],
      direccion: ['' ],
      telefono: [''],
      email: ['', [Validators.email]],
      estadoRegistro: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.empresaForm.reset();
    if (this.data.esNuevo) {
      this.empresaForm.patchValue({ estado: 'A' });
    } else {
      this.empresaForm.patchValue(this.data.objEmpresa);
    }
  }

  ngOnDestroy(): void {
    if (this.empresaSuscripcion) {
      this.empresaSuscripcion.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.empresaForm.invalid) {
      return;
    }

    const empresaData = this.empresaForm.value;
    const empresaDataCreate: any = empresaData;
    const empresaDataUpdate: any = empresaData;


    this.loadingSave = true;

    const request$: Observable<IResponseGeneric<ICreateEmpresaTransporteResponse> | IResponseGeneric<boolean>> = this.data.esNuevo
      ? this.adminOfService.createEmpresaTransporte(empresaDataCreate)
      : this.adminOfService.updateEmpresaTransporte(empresaDataUpdate);

    this.empresaSuscripcion = request$.subscribe({
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
