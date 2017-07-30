import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PutOperationComponent } from './put-operation.component';

describe('PutOperationComponent', () => {
  let component: PutOperationComponent;
  let fixture: ComponentFixture<PutOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PutOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PutOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
