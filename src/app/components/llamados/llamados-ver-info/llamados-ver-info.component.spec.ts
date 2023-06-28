import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadosVerInfoComponent } from './llamados-ver-info.component';

describe('LlamadosVerInfoComponent', () => {
  let component: LlamadosVerInfoComponent;
  let fixture: ComponentFixture<LlamadosVerInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LlamadosVerInfoComponent]
    });
    fixture = TestBed.createComponent(LlamadosVerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
