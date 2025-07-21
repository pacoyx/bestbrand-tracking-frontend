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
import { AdminModService } from '../../../../services/admin-mod.service';
import { ICreateUsuarioRequest, IGetConductoresToHelpResponse, IUpdateUsuarioRequest } from '../../../../interfaces/IUser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PrependZeroOptionPipe } from '../../../../../../core/pipes/prepend-zero-option.pipe';
import { FormErrorsComponent } from '../../../../../../core/components/form-errors/form-errors.component';

@Component({
  selector: 'app-dialog-form-reg-usuario',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatDialogActions, MatDialogTitle,
    MatDialogContent, MatIconModule, MatCheckboxModule,
    MatSelectModule, MatButtonModule, PrependZeroOptionPipe, FormErrorsComponent
  ],
  templateUrl: './dialog-form-reg-usuario.component.html',
  styleUrl: './dialog-form-reg-usuario.component.css'
})
export class DialogFormRegUsuarioComponent {
  readonly data = inject<{ esNuevo: boolean, objUsuario: any, objConductores: IGetConductoresToHelpResponse[] }>(MAT_DIALOG_DATA);
  adminModService = inject(AdminModService);
  usuarioForm: FormGroup;
  loadingSave = false;
  titulo = this.data.esNuevo ? 'Registrar Usuario' : 'Actualizar Usuario';
  usuarioSuscripcion!: Subscription;
  checkedPwd = false;

  conductorErrorMessages = {
    username: { required: 'El nombre de usuario es obligatorio.' },    
    role: { required: 'El rol es obligatorio.' },
    estado: { required: 'El estado es obligatorio.' }
  };

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogFormRegUsuarioComponent>,
  ) {
    this.usuarioForm = this.fb.group({
      id: 0,
      username: ['', Validators.required],
      password: [''],
      role: ['', Validators.required],
      conductorId: 0,
      estado: ['', Validators.required],
      cambiarPassword: false,
    });
  }

  ngOnInit(): void {
    this.usuarioForm.reset();
    if (this.data.esNuevo) {
      this.usuarioForm.patchValue({ estado: 'A', conductorId: 0 });
    } else {
      this.usuarioForm.patchValue(this.data.objUsuario);
      this.usuarioForm.get('password')?.setValue('*****');
      this.usuarioForm.get('password')?.disable();
    }

    this.usuarioForm.get('cambiarPassword')?.valueChanges.subscribe((cambiar: boolean) => {
      if (cambiar) {
        this.usuarioForm.get('password')?.enable();
        this.usuarioForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      } else {
        this.usuarioForm.get('password')?.disable();
        this.usuarioForm.get('password')?.clearValidators();
      }
    });

  }

  ngOnDestroy(): void {
    if (this.usuarioSuscripcion) {
      this.usuarioSuscripcion.unsubscribe();
    }
  }

  onSubmit(): void {

    // console.log('Form Value:', this.usuarioForm.value);


    if (this.data.esNuevo && this.usuarioForm.invalid) {
      return;
    }

    if (!this.data.esNuevo) {
      if (this.usuarioForm.get('cambiarPassword')?.value) {
        if (!this.usuarioForm.get('password')?.value) {
          console.log('Debe ingresar una contraseña');
          return;
        }
      }      
    }

    const usuarioData = this.usuarioForm.value;
    const usuarioDataCreate: any = usuarioData;
    const usuarioDataUpdate: IUpdateUsuarioRequest = {
      id: usuarioData.id,
      username: usuarioData.username,
      password: usuarioData.cambiarPassword ? usuarioData.password : '',
      role: usuarioData.role,
      conductorId: usuarioData.conductorId,
      estado: usuarioData.estado      
    };

    console.log('usuarioDataCreate: ==>', usuarioDataCreate);    
    console.log('usuarioDataUpdate: ==>', usuarioDataUpdate);


    this.loadingSave = true;

    const request$: Observable<IResponseGeneric<ICreateUsuarioRequest> | IResponseGeneric<IUpdateUsuarioRequest>> = this.data.esNuevo
      ? this.adminModService.createUser(usuarioDataCreate)
      : this.adminModService.updateUser(usuarioDataUpdate);

    this.usuarioSuscripcion = request$.subscribe({
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
