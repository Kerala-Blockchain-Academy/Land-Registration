import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPropertiesComponent } from './search-properties.component';

describe('SearchPropertiesComponent', () => {
  let component: SearchPropertiesComponent;
  let fixture: ComponentFixture<SearchPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
