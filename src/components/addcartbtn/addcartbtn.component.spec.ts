import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcartbtnComponent } from './addcartbtn.component';

describe('AddcartbtnComponent', () => {
  let component: AddcartbtnComponent;
  let fixture: ComponentFixture<AddcartbtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcartbtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddcartbtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
