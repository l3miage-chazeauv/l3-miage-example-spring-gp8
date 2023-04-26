import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheMiaComponent } from './recherche-mia.component';

describe('RechercheMiaComponent', () => {
  let component: RechercheMiaComponent;
  let fixture: ComponentFixture<RechercheMiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercheMiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheMiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
