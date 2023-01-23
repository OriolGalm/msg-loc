import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMsgComponent } from './read-msg.component';

describe('ReadMsgComponent', () => {
  let component: ReadMsgComponent;
  let fixture: ComponentFixture<ReadMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadMsgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
