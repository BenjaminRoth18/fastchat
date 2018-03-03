import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material';
import { UserService } from '../shared/user.service';
import { StoreModule } from '@ngrx/store';
import { User } from '../shared/model/user';
import { Subject } from 'rxjs/Subject';

export class UserServiceStub {
  userOnline = new Subject<number>();
}

const testState = {
  user: new User(null, '', '')
};

export function testReducer(state = testState, action) {
  return state;
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        MatToolbarModule,
        StoreModule.forRoot({ user: testReducer })
      ],
      providers: [
        {
          provide: UserService,
          useClass: UserServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
