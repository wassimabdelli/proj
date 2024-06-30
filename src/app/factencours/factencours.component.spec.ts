import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactencoursComponent } from './factencours.component';

describe('FactencoursComponent', () => {
  let component: FactencoursComponent;
  let fixture: ComponentFixture<FactencoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactencoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactencoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
