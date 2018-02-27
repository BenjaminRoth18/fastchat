import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from '../../shared/message.service';
import { User } from '../../shared/model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('usernameInput') usernameInput: ElementRef;
  signupForm: FormControl;

  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ms: MessageService) { }

  ngOnInit() {
    this.signupForm = new FormControl('', [Validators.required]);
  }

  getRandomId() {
    return Math.floor((Math.random() * 1000000) + 1);
  }

  getAvatar() {
    const id =  Math.floor((Math.random() * 100) + 1);
    return 'https://api.adorable.io/avatars/285/' + id;
  }

  onSave() {
    if (this.usernameInput.nativeElement.value !== '') {
      this.dialogRef.close(this.ms.setUser(new User(this.getRandomId(), this.usernameInput.nativeElement.value, this.getAvatar())));
    }
  }
}
