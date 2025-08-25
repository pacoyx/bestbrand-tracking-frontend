import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewPedidosComponent } from './page-view-pedidos.component';

describe('PageViewPedidosComponent', () => {
  let component: PageViewPedidosComponent;
  let fixture: ComponentFixture<PageViewPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageViewPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageViewPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
