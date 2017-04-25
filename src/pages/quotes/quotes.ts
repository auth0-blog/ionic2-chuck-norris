import {Component} from "@angular/core";
import {IonicPage} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Storage} from "@ionic/storage";
import {AuthService} from "../../app/services/auth/auth";

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class Quotes {
  API: string = "http://localhost:3001/api";
  quote: string;
  error: string;

  constructor(private http: Http, private storage: Storage, private auth: AuthService) {
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
      console.log(token);

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
