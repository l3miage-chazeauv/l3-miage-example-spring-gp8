import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmEditingComponent } from './qcm-editing.component';

describe('QcmEditingComponent', () => {
  let component: QcmEditingComponent;
  let fixture: ComponentFixture<QcmEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QcmEditingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcmEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
