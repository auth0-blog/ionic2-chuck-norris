import {NgModule, ErrorHandler} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {MyApp} from "./app.component";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {TabsPage} from "../pages/tabs/tabs";
import {Profile} from "../pages/profile/profile";
import {Quotes} from "../pages/quotes/quotes";
import {HttpModule} from "@angular/http";
import {IonicStorageModule} from "@ionic/storage";
import {CallbackComponent} from "./callback.component";
import {AuthService} from "./services/auth/auth";

@NgModule({
  declarations: [
    MyApp, TabsPage, Quotes, Profile
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '',
      driverOrder: ['localstorage']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    Quotes,
    Profile
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
