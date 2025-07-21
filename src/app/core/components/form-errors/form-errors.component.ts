import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-errors',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  template: `
    @if(form.invalid && (form.dirty || form.touched)){
    <ng-container>
      <div style="margin-bottom: 10px;">
        <mat-card style="background: #ffebee; color: #b71c1c; padding: 10px;">
          <mat-icon style="vertical-align: middle;">error</mat-icon>
          <span style="vertical-align: middle;">
            Por favor corrija los siguientes errores:
          </span>
          <ul style="margin: 5px 0 0 20px;">
            @for (field of errorFields; track $index) {
              @if(form.get(field)){
                @for (errorKey of getErrorKeys(field); track $index) {
                  @if(form.get(field)?.hasError(errorKey)){
                  <li>
                    {{ getErrorMessage(field, errorKey) }}
                  </li>
                  }                 
                }                
              }
            }            
            
          </ul>
        </mat-card>
      </div>
    </ng-container>
    }
    
  `
})
export class FormErrorsComponent {
  @Input() form!: FormGroup;
  @Input() errorMessages!: { [field: string]: { [error: string]: string } };

  get errorFields(): string[] {
    return Object.keys(this.errorMessages || {});
  }

  getErrorKeys(field: string): string[] {
    return Object.keys(this.errorMessages[field] || {});
  }

  getErrorMessage(field: string, errorKey: string): string {
    return this.errorMessages[field]?.[errorKey] || '';
  }
}
