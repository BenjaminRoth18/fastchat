import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatInputModule } from '@angular/material';
import { UserService } from '../../shared/user.service';
import { MessageService } from '../../shared/message.service';
import { Subject } from 'rxjs/Subject';
import { StoreModule } from '@ngrx/store';
import { User } from '../../shared/model/user';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class MessageServiceStub {
  message = new Subject<any>();
}

export class UserServiceStub {}

const testState = {
  user: new User(null, '', '')
}

export function testReducer(state = testState, action) {
  return state;
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent
      ],
      imports: [
        MatDialogModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ user: testReducer })
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA,
          useValue: []
        },
        {
          provide: MessageService,
          useClass: MessageServiceStub
        },
        {
          provide: UserService,
          useClass: UserServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
