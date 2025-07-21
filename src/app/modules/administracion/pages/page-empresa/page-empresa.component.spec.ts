import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEmpresaComponent } from './page-empresa.component';

describe('PageEmpresaComponent', () => {
  let component: PageEmpresaComponent;
  let fixture: ComponentFixture<PageEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
