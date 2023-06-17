import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosRoleDialogComponent } from './usuarios-role-dialog.component';

describe('UsuariosRoleDialogComponent', () => {
  let component: UsuariosRoleDialogComponent;
  let fixture: ComponentFixture<UsuariosRoleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariosRoleDialogComponent]
    });
    fixture = TestBed.createComponent(UsuariosRoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
