import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsabilidadesComponent } from './responsabilidades.component';

describe('ResponsabilidadesComponent', () => {
  let component: ResponsabilidadesComponent;
  let fixture: ComponentFixture<ResponsabilidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsabilidadesComponent]
    });
    fixture = TestBed.createComponent(ResponsabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
