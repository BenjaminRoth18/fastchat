import { Action } from './action';

export interface Message {
  id?: number;
  avatar?: string;
  date?: string;
  from?: string;
  message?: string;
  action?: Action;
}
