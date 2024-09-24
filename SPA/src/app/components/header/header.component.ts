import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {GoogleApiService, UserInfo} from "../../services/google-api.service";
// @ts-ignore
import config from "../../../../config";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public currentUrl: string | undefined;

  userInfo?: UserInfo
  role?: string
  validated: string = "false";

  constructor(private router: Router, private readonly googleApi: GoogleApiService) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = e.url;
        if (this.currentUrl==="/"){
          this.currentUrl = "dashboard"
        }else {
          this.currentUrl = this.currentUrl.replace("/","");
        }
        const box = document.getElementById(this.currentUrl);

        if (box != null) {
          box.classList.add('active');
        }
      }
    });
  }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn()
  }

  logout() {
    this.googleApi.signOut()
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.googleApi.userProfileSubject?.subscribe(info => {
      this.userInfo = info
      this.role = localStorage.getItem("role")!
      this.validated = localStorage.getItem("validated")!
      if (!config.USE_SSO){
        this.role = "free"
        this.validated = "true"
      }
    })
  }
}
