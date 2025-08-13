import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWebcamComponent } from './dialog-webcam.component';

describe('DialogWebcamComponent', () => {
  let component: DialogWebcamComponent;
  let fixture: ComponentFixture<DialogWebcamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogWebcamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogWebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
