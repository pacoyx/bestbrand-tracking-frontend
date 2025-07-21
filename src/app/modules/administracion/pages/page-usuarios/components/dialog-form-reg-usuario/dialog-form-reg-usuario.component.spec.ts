import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormRegUsuarioComponent } from './dialog-form-reg-usuario.component';

describe('DialogFormRegUsuarioComponent', () => {
  let component: DialogFormRegUsuarioComponent;
  let fixture: ComponentFixture<DialogFormRegUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFormRegUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFormRegUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
