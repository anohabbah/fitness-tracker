import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireModule} from 'angularfire2';
import {NgModule} from '@angular/core';

import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './material.module';
import {AuthModule} from './auth/auth.module';

import {TrainingService} from './training/training.service';
import {AuthService} from './auth/auth.service';
import {UiService} from './shared/ui.service';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {HeaderComponent} from './navigation/header/header.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService, TrainingService, UiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
