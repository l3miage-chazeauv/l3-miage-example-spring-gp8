import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivePartiesComponent } from './archive-parties.component';

describe('ArchivePartiesComponent', () => {
  let component: ArchivePartiesComponent;
  let fixture: ComponentFixture<ArchivePartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivePartiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivePartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
