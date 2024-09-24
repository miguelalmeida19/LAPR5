import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OAuthService} from "angular-oauth2-oidc";
import {AuthService} from "./services/auth.service";
import {UserInfo} from "./services/google-api.service";
import {catchError, tap} from "rxjs/operators";
import {Package} from "./domain/package";
import {EMPTY} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private oauthService: OAuthService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.oauthService.events.subscribe(e => {
      if (e.type === 'token_received') {
        this.oauthService.loadUserProfile().then((userProfile) => {
          let profile = userProfile as UserInfo
          let email = profile.info.email
          this.authService.login(email).pipe(
            catchError((err, caught) => {
              this.oauthService.revokeTokenAndLogout({
                client_id: this.oauthService.clientId,
                returnTo: this.oauthService.postLogoutRedirectUri
              }, true);
              this.oauthService.logOut();
              location.reload()
              return EMPTY;
            })
          ).subscribe((value)=>{
            localStorage.setItem("role", value.userDTO.role)
            localStorage.setItem("phoneNumber", value.userDTO.phoneNumber)
            localStorage.setItem("picture", value.userDTO.picture)
            localStorage.setItem("validated","false")
            location.reload()
          });
        });

      }
    });
  }





}
