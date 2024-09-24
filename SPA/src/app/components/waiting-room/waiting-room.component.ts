import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})

export class WaitingRoomComponent {

  checked: boolean = false

  constructor(private router: Router) {
  }

  validate(){
    localStorage.setItem("validated","true")
    location.replace(location.origin)
  }

  changeChecked(){
    this.checked = !this.checked
  }
}
