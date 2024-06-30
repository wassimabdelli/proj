import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllfactureComponent } from './allfacture.component';

describe('AllfactureComponent', () => {
  let component: AllfactureComponent;
  let fixture: ComponentFixture<AllfactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllfactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
