import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectLinkedinComponent } from './connect-linkedin.component';

describe('ConnectLinkedinComponent', () => {
  let component: ConnectLinkedinComponent;
  let fixture: ComponentFixture<ConnectLinkedinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectLinkedinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectLinkedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
