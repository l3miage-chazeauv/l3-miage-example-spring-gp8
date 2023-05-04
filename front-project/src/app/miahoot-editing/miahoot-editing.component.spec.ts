import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiahootEditingComponent } from './miahoot-editing.component';

describe('MiahootEditingComponent', () => {
  let component: MiahootEditingComponent;
  let fixture: ComponentFixture<MiahootEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiahootEditingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiahootEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
