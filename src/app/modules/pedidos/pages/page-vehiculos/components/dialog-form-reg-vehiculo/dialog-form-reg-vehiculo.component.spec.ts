import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormRegVehiculoComponent } from './dialog-form-reg-vehiculo.component';

describe('DialogFormRegVehiculoComponent', () => {
  let component: DialogFormRegVehiculoComponent;
  let fixture: ComponentFixture<DialogFormRegVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFormRegVehiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFormRegVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
