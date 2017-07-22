import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes,RouterModule } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { MixtapesComponent } from './mixtapes/mixtapes.component';
import { SingleMixtapeComponent } from './single-mixtape/single-mixtape.component';
import { RegformComponent } from './regform/regform.component';
import { LoginformComponent } from './loginform/loginform.component';
import { MediaplayerComponent } from './mediaplayer/mediaplayer.component';
import {PlayerService} from "./player.service";

const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'main', component: MixtapesComponent},
  {path: 'login',component: LoginComponent},
  {path: 'registerform',component: RegformComponent},
  {path: 'loginform', component: LoginformComponent},
  {path: 'singlemix/:id', component: SingleMixtapeComponent},
  {path: 'test', component: MediaplayerComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MixtapesComponent,
    SingleMixtapeComponent,
    RegformComponent,
    LoginformComponent,
    MediaplayerComponent
  ],
  imports: [
    BrowserModule,
    YoutubePlayerModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    LocalStorageModule.withConfig({
      prefix: 'kc',
      storageType: 'localStorage'
    })
  ],
  exports: [RouterModule],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})

export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
