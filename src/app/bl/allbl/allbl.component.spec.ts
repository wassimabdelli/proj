import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllblComponent } from './allbl.component';

describe('AllblComponent', () => {
  let component: AllblComponent;
  let fixture: ComponentFixture<AllblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllblComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
