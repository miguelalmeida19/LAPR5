import {UserInfo} from "../services/google-api.service";
import {Subject} from "rxjs";

export class MockGoogleApiService {
  userProfileSubject = new Subject<UserInfo>();

  isLoggedIn() {
    return true;
  }

  signOut() {}
}
