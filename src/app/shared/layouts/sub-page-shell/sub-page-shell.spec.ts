import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPageShell } from './sub-page-shell';

describe('SubPageShell', () => {
  let component: SubPageShell;
  let fixture: ComponentFixture<SubPageShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubPageShell],
    }).compileComponents();

    fixture = TestBed.createComponent(SubPageShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
