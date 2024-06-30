import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactManuelComponent } from './fact-manuel.component';

describe('FactManuelComponent', () => {
  let component: FactManuelComponent;
  let fixture: ComponentFixture<FactManuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactManuelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactManuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
