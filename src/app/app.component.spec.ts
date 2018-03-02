import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: '<p>Stub Header</p>'
})
export class HeaderStubComponent {}

@Component({
  selector: 'app-chat',
  template: '<p>Stub Chat</p>'
})
export class ChatStubComponent {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderStubComponent,
        ChatStubComponent
      ],
      imports: [
        StoreModule.forRoot(reducers)
      ],
      providers: []
    }).compileComponents();
  }));
  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );
});
