import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVisorImgComponent } from './dialog-visor-img.component';

describe('DialogVisorImgComponent', () => {
  let component: DialogVisorImgComponent;
  let fixture: ComponentFixture<DialogVisorImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogVisorImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogVisorImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
