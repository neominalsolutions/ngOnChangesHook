import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOnChangesComponent } from './test-on-changes.component';

describe('TestOnChangesComponent', () => {
  let component: TestOnChangesComponent;
  let fixture: ComponentFixture<TestOnChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestOnChangesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestOnChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
