import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-input',
  template: '<p>Stub Input</p>'
})
export class InputStubComponent {}

@Component({
  selector: 'app-messages',
  template: '<p>Stub Messages</p>'
})
export class MessagesStubComponent {}

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatComponent,
        InputStubComponent,
        MessagesStubComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
