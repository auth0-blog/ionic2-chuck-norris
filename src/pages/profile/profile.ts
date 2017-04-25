import {Component} from "@angular/core";
import {IonicPage} from "ionic-angular";
import {Headers, Http} from "@angular/http";
import {JwtHelper} from "angular2-jwt";
import {Storage} from "@ionic/storage";
import {AuthService} from "../../app/services/auth/auth";
import "rxjs/add/operator/map";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {
  auth0: any;

  // When the page loads, we want the Login segment to be selected
  authType: string = "login";

  // We need to set the content type for the server
  contentHeader = new Headers({"Content-Type": "application/json"});
  error: string;
  jwtHelper = new JwtHelper();
  user: string;

  constructor(private http: Http, private storage: Storage, private auth: AuthService) {
    this.auth0 = auth.auth0Client;

    storage.ready().then(() => {
      storage.get('profile').then(profile => {
        this.user = profile;
      }).catch(console.log);
    });
  }

  login() {
    // Auth0 authorize request
    this.auth0.authorize({
      responseType: 'token id_token',
      redirectUri: 'http://localhost:8100/',
      audience: 'http://localhost:8100/api/'
    });
  }

  logout() {
    // Remove tokens and profile and update login status subject
    this.storage.remove('access_token');
    this.storage.remove('id_token');
    this.storage.remove('profile');
    this.user = null;
  }
}
