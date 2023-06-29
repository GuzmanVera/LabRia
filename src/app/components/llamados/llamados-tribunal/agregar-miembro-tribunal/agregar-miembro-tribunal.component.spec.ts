import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMiembroTribunalComponent } from './agregar-miembro-tribunal.component';

describe('AgregarMiembroTribunalComponent', () => {
  let component: AgregarMiembroTribunalComponent;
  let fixture: ComponentFixture<AgregarMiembroTribunalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarMiembroTribunalComponent]
    });
    fixture = TestBed.createComponent(AgregarMiembroTribunalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
