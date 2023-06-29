import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPostulanteComponent } from './eliminar-postulante.component';

describe('EliminarPostulanteComponent', () => {
  let component: EliminarPostulanteComponent;
  let fixture: ComponentFixture<EliminarPostulanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarPostulanteComponent]
    });
    fixture = TestBed.createComponent(EliminarPostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
