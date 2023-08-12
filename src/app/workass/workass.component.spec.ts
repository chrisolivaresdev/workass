import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkassComponent } from './workass.component';

describe('WorkassComponent', () => {
  let component: WorkassComponent;
  let fixture: ComponentFixture<WorkassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
