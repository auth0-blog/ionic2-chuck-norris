import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {Quotes} from "./quotes";

@NgModule({
  declarations: [
    Quotes,
  ],
  imports: [
    IonicPageModule.forChild(Quotes),
  ],
  exports: [
    Quotes
  ]
})
export class QuotesModule {}
