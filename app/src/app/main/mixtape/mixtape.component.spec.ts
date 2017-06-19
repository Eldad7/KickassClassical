import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MixtapeComponent } from './mixtape.component';

describe('MixtapeComponent', () => {
  let component: MixtapeComponent;
  let fixture: ComponentFixture<MixtapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MixtapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MixtapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
