import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import {AuthService} from "../../app/services/auth/auth";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class Quotes {
  API: string = "http://localhost:3001/api";
  quote: string;
  error: string;
  auth: AuthService;

  constructor(private http: Http, private storage: Storage) {
    this.auth = AuthService;
  }

  getQuote() {
    // Use a regular Http call to access unsecured routes
    this.http.get(`${this.API}/random-quote`)
      .map(res => res.text())
      .subscribe(
        data => this.quote = data,
        err => this.error = err
      );
  }

  getSecretQuote() {
    // Use authHttp to access secured routes
    this.storage.get('token').then((token) => {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);
      console.log(this.storage.get('token'));

      this.http.get(`${this.API}/protected/random-quote`, {
        headers: headers
      }).map(res => res.text())
        .subscribe(
          data => this.quote = data,
          err => this.error = err
        );
    })
  }
}
