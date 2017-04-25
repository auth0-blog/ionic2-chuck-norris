import {tokenNotExpired} from "angular2-jwt";
import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";

declare var auth0: any;

@Injectable()
export class AuthService {
  public auth0Client = new auth0.WebAuth({
    clientID: 'vsCSQo78JstXR4DugxQgbJk4dSIW2X61',
    domain: 'bkrebs.auth0.com'
  });

  user: string;

  constructor(private storage: Storage) {}

  handleAuth() {
    // When Auth0 hash parsed, get profile
    this.auth0Client.parseHash((err, authResult) => {
      console.log(authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._getProfile(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
    });
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0Client.client.userInfo(authResult.accessToken, (err, profile) => {
      this._setSession(authResult, profile);
    });
  }

  private _setSession(authResult, profile) {
    // Save session data and update login status subject
    this.storage.set('token', authResult.accessToken);
    this.storage.set('id_token', authResult.idToken);
    this.storage.set('profile', JSON.stringify(profile));
    this.user = profile;
  }

  authenticated() {
    return tokenNotExpired('/_ionickv/token');
  }
}
