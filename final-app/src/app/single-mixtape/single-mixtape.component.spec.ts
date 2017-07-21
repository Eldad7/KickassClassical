import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMixtapeComponent } from './single-mixtape.component';

describe('SingleMixtapeComponent', () => {
  let component: SingleMixtapeComponent;
  let fixture: ComponentFixture<SingleMixtapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleMixtapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMixtapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
