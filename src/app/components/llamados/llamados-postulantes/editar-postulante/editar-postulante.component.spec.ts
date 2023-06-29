import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPostulanteComponent } from './editar-postulante.component';

describe('EditarPostulanteComponent', () => {
  let component: EditarPostulanteComponent;
  let fixture: ComponentFixture<EditarPostulanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPostulanteComponent]
    });
    fixture = TestBed.createComponent(EditarPostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
