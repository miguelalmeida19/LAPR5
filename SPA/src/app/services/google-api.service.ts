import {Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {Router} from "@angular/router";
import {BehaviorSubject, Subject} from "rxjs";
// @ts-ignore
import config from "../../../config";

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin + "/waiting",
  clientId: '13713507624-p34ncfjnk3j4tlg70v925hd63krdvk9c.apps.googleusercontent.com',
  scope: 'openid profile email'
}

export interface UserInfo {
  info: {
    email: string,
    name: string,
    picture: string
  }
}

@Injectable({
  providedIn: 'root'
})

export class GoogleApiService {
  userProfileSubject: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>({
    info: {
      email: '',
      name: '',
      picture: '',
    },
  });

  constructor(private readonly oAuthService: OAuthService) {
    if (config.USE_SSO) {
      oAuthService.configure(oAuthConfig);
      oAuthService.loadDiscoveryDocument().then(() => {
        oAuthService.tryLoginImplicitFlow().then(() => {
          if (!oAuthService.hasValidAccessToken()) {
            oAuthService.initLoginFlow();
          } else
          {
            oAuthService.loadUserProfile().then((userProfile) => {
              localStorage.setItem('isLoggedIn', 'true');
              this.userProfileSubject.next(userProfile as UserInfo);
            });
          }
        });
      });
    } else {
      localStorage.setItem('isLoggedIn', 'true');
      this.userProfileSubject.next({
        info: {
          email: 'elonmusk@eletricgo.com',
          name: 'Elon Musk',
          picture: 'https://i.ibb.co/zrysKDr/boss.png',
        },
      });
    }

    this.userProfileSubject.subscribe((info) => {
      console.log(info);
    });

    console.log(this.userProfileSubject.getValue()); // log the initial value of the userProfileSubject
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signOut() {
    this.oAuthService.revokeTokenAndLogout({
      client_id: this.oAuthService.clientId,
      returnTo: this.oAuthService.postLogoutRedirectUri
    }, true);
    this.oAuthService.logOut();
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem("validated")
    localStorage.removeItem("picture")
    localStorage.removeItem("phoneNumber")
    localStorage.removeItem("role")
  }
}
