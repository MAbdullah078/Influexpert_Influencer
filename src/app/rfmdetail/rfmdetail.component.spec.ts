import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfmdetailComponent } from './rfmdetail.component';

describe('RfmdetailComponent', () => {
  let component: RfmdetailComponent;
  let fixture: ComponentFixture<RfmdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfmdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfmdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
