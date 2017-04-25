import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {Profile} from "./profile";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    Profile,
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(Profile)
  ],
  exports: [
    Profile
  ]
})
export class ProfileModule {}
