import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBLComponent } from './add-bl.component';

describe('AddBLComponent', () => {
  let component: AddBLComponent;
  let fixture: ComponentFixture<AddBLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBLComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
