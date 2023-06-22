import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadosDialogComponent } from './llamados-dialog.component';

describe('LlamadosDialogComponent', () => {
  let component: LlamadosDialogComponent;
  let fixture: ComponentFixture<LlamadosDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LlamadosDialogComponent]
    });
    fixture = TestBed.createComponent(LlamadosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
