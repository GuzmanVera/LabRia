import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasDeleteDialogComponent } from './personas-delete-dialog.component';

describe('PersonasDeleteDialogComponent', () => {
  let component: PersonasDeleteDialogComponent;
  let fixture: ComponentFixture<PersonasDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonasDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(PersonasDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
