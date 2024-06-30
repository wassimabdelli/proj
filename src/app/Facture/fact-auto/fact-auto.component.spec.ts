import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactAutoComponent } from './fact-auto.component';

describe('FactAutoComponent', () => {
  let component: FactAutoComponent;
  let fixture: ComponentFixture<FactAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactAutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
