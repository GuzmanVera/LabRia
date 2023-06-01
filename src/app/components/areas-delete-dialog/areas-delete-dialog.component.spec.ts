import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasDeleteDialogComponent } from './areas-delete-dialog.component';

describe('AreasDeleteDialogComponent', () => {
  let component: AreasDeleteDialogComponent;
  let fixture: ComponentFixture<AreasDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreasDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(AreasDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
