import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelOperationComponent } from './del-operation.component';

describe('DelOperationComponent', () => {
  let component: DelOperationComponent;
  let fixture: ComponentFixture<DelOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
