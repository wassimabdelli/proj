import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFactComponent } from './update-fact.component';

describe('UpdateFactComponent', () => {
  let component: UpdateFactComponent;
  let fixture: ComponentFixture<UpdateFactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
