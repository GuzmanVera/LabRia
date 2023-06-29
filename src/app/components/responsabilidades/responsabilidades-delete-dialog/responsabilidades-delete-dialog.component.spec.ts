import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsabilidadesDeleteDialogComponent } from './responsabilidades-delete-dialog.component';

describe('ResponsabilidadesDeleteDialogComponent', () => {
  let component: ResponsabilidadesDeleteDialogComponent;
  let fixture: ComponentFixture<ResponsabilidadesDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsabilidadesDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(ResponsabilidadesDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
