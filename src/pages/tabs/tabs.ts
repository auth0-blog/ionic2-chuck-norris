import {Component} from '@angular/core';
import {Profile} from '../profile/profile';
import {Quotes} from '../quotes/quotes';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  profilePage = Profile;
  quotesPage = Quotes;

  constructor() {
  }
}
