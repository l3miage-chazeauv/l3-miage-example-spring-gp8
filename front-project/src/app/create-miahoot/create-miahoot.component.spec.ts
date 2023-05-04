import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMiahootComponent } from './create-miahoot.component';

describe('CreateMiahootComponent', () => {
  let component: CreateMiahootComponent;
  let fixture: ComponentFixture<CreateMiahootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMiahootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMiahootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
