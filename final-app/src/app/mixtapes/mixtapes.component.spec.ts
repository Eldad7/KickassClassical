import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MixtapesComponent } from './mixtapes.component';

describe('MixtapesComponent', () => {
  let component: MixtapesComponent;
  let fixture: ComponentFixture<MixtapesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MixtapesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MixtapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
