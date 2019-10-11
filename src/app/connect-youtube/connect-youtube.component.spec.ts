import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectYoutubeComponent } from './connect-youtube.component';

describe('ConnectYoutubeComponent', () => {
  let component: ConnectYoutubeComponent;
  let fixture: ComponentFixture<ConnectYoutubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectYoutubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
