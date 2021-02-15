import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxChordDiagramComponent} from './ngx-chord-diagram.component';

describe('NgxChordDiagramComponent', () => {
  let component: NgxChordDiagramComponent;
  let fixture: ComponentFixture<NgxChordDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxChordDiagramComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChordDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
