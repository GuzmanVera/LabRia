import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadosTribunalComponent } from './llamados-tribunal.component';

describe('LlamadosTribunalComponent', () => {
  let component: LlamadosTribunalComponent;
  let fixture: ComponentFixture<LlamadosTribunalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LlamadosTribunalComponent]
    });
    fixture = TestBed.createComponent(LlamadosTribunalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
