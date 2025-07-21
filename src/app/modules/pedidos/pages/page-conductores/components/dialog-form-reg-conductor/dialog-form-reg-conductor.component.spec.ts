import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormRegConductorComponent } from './dialog-form-reg-conductor.component';

describe('DialogFormRegConductorComponent', () => {
  let component: DialogFormRegConductorComponent;
  let fixture: ComponentFixture<DialogFormRegConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFormRegConductorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFormRegConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
