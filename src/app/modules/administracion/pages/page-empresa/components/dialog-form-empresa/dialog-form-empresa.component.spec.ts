import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormEmpresaComponent } from './dialog-form-empresa.component';

describe('DialogFormEmpresaComponent', () => {
  let component: DialogFormEmpresaComponent;
  let fixture: ComponentFixture<DialogFormEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFormEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFormEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
