import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];
  displayDialog: boolean = false;

  displayError(){
    this.displayDialog = true;
    setTimeout(() => {
      this.displayDialog = false;
    }, 2000);
  }

  add(message: string) {

    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
