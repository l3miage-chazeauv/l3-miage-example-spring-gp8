import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reponse2Component } from './reponse2.component';

describe('Reponse2Component', () => {
  let component: Reponse2Component;
  let fixture: ComponentFixture<Reponse2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Reponse2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reponse2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
