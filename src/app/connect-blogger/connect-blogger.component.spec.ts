import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectBloggerComponent } from './connect-blogger.component';

describe('ConnectBloggerComponent', () => {
  let component: ConnectBloggerComponent;
  let fixture: ComponentFixture<ConnectBloggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectBloggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectBloggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
