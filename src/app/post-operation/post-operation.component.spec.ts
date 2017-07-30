import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOperationComponent } from './post-operation.component';

describe('PostOperationComponent', () => {
  let component: PostOperationComponent;
  let fixture: ComponentFixture<PostOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
