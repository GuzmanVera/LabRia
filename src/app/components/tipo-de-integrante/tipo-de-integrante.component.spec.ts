import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeIntegranteComponent } from './tipo-de-integrante.component';

describe('TipoDeIntegranteComponent', () => {
  let component: TipoDeIntegranteComponent;
  let fixture: ComponentFixture<TipoDeIntegranteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDeIntegranteComponent]
    });
    fixture = TestBed.createComponent(TipoDeIntegranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
