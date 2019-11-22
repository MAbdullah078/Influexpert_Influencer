import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedprofileComponent } from './linkedprofile.component';

describe('LinkedprofileComponent', () => {
  let component: LinkedprofileComponent;
  let fixture: ComponentFixture<LinkedprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
