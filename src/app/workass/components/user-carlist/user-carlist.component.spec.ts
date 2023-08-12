import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCarlistComponent } from './user-carlist.component';

describe('UserCarlistComponent', () => {
  let component: UserCarlistComponent;
  let fixture: ComponentFixture<UserCarlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCarlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCarlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
