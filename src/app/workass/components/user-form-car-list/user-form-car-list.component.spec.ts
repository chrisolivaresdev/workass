import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormCarListComponent } from './user-form-car-list.component';

describe('UserFormCarListComponent', () => {
  let component: UserFormCarListComponent;
  let fixture: ComponentFixture<UserFormCarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormCarListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
