import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchforgigsComponent } from './searchforgigs.component';

describe('SearchforgigsComponent', () => {
  let component: SearchforgigsComponent;
  let fixture: ComponentFixture<SearchforgigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchforgigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchforgigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
