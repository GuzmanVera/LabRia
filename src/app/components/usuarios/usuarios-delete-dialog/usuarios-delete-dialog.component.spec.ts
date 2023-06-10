import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosDeleteDialogComponent } from './usuarios-delete-dialog.component';

describe('UsuariosDeleteDialogComponent', () => {
  let component: UsuariosDeleteDialogComponent;
  let fixture: ComponentFixture<UsuariosDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariosDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(UsuariosDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
