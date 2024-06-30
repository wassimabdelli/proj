import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EVentesComponent } from './eventes.component';

describe('EVentesComponent', () => {
  let component: EVentesComponent;
  let fixture: ComponentFixture<EVentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EVentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EVentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
