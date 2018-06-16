import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellenComponent } from './spellen.component';

describe('SpellenComponent', () => {
  let component: SpellenComponent;
  let fixture: ComponentFixture<SpellenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
