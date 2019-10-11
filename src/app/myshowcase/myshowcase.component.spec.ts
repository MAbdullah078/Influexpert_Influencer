import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyshowcaseComponent } from './myshowcase.component';

describe('MyshowcaseComponent', () => {
  let component: MyshowcaseComponent;
  let fixture: ComponentFixture<MyshowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyshowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyshowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
