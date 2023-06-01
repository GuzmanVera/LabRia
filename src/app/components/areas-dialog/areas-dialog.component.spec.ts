import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasDialogComponent } from './areas-dialog.component';

describe('AreasDialogComponent', () => {
  let component: AreasDialogComponent;
  let fixture: ComponentFixture<AreasDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreasDialogComponent]
    });
    fixture = TestBed.createComponent(AreasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
