import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadosDeleteDialogComponent } from './llamados-delete-dialog.component';

describe('LlamadosDeleteDialogComponent', () => {
  let component: LlamadosDeleteDialogComponent;
  let fixture: ComponentFixture<LlamadosDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LlamadosDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(LlamadosDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
