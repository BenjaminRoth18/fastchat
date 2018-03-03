import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../shared/message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class MessageServiceStub {}

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputComponent
      ],
      imports: [
        MatIconModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      providers: [ {provide: MessageService, useClass: MessageServiceStub} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
