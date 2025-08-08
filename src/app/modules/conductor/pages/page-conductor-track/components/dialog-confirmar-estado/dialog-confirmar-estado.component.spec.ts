import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmarEstadoComponent } from './dialog-confirmar-estado.component';

describe('DialogConfirmarEstadoComponent', () => {
  let component: DialogConfirmarEstadoComponent;
  let fixture: ComponentFixture<DialogConfirmarEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogConfirmarEstadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmarEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
