import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MatCardModule, MatListModule, MatToolbarModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { InputComponent } from './chat/input/input.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RegisterComponent } from './chat/register/register.component';
import { UserService } from './shared/user.service';
import { MessageService } from './shared/message.service';
import { MessageComponent } from './chat/messages/message/message.component';
import { MessagesComponent } from './chat/messages/messages.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChatComponent,
    InputComponent,
    RegisterComponent,
    MessageComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [UserService, MessageService],
  bootstrap: [AppComponent],
  entryComponents: [RegisterComponent]
})
export class AppModule { }
