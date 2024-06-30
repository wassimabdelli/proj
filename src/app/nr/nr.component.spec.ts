import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NRComponent } from './nr.component';

describe('NRComponent', () => {
  let component: NRComponent;
  let fixture: ComponentFixture<NRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
