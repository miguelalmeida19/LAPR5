import {Component, OnInit} from '@angular/core';
import {GoogleApiService, UserInfo} from "../../services/google-api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit{
  userInfo?: UserInfo
  role?: string;
  phoneNumber?: string;

  constructor(private readonly googleApi: GoogleApiService) {
  }

  ngOnInit(): void {
    this.googleApi.userProfileSubject?.subscribe(info => this.userInfo = info)
    this.role = localStorage.getItem("role")!.toString()
    this.phoneNumber = localStorage.getItem("phoneNumber")!.toString()
  }
}
