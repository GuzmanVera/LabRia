import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsabilidadesDialogComponent } from './responsabilidades-dialog.component';

describe('ResponsabilidadesDialogComponent', () => {
  let component: ResponsabilidadesDialogComponent;
  let fixture: ComponentFixture<ResponsabilidadesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsabilidadesDialogComponent]
    });
    fixture = TestBed.createComponent(ResponsabilidadesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
