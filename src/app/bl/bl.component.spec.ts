import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BLComponent } from './bl.component';

describe('BLComponent', () => {
  let component: BLComponent;
  let fixture: ComponentFixture<BLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BLComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
