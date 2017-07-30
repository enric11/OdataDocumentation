import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOperationComponent } from './get-operation.component';

describe('GetOperationComponent', () => {
  let component: GetOperationComponent;
  let fixture: ComponentFixture<GetOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
