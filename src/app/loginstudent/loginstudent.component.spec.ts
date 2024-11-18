import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginstudentComponent } from './loginstudent.component';

describe('LoginstudentComponent', () => {
  let component: LoginstudentComponent;
  let fixture: ComponentFixture<LoginstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginstudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
