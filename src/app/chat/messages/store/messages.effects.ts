import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as MessagesActions from './messages.actions';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class MessagesEffects {
  constructor(private actions$: Actions) {}
}
