import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBLComponent } from './update-bl.component';

describe('UpdateBLComponent', () => {
  let component: UpdateBLComponent;
  let fixture: ComponentFixture<UpdateBLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBLComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
