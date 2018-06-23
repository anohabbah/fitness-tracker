import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './material.module';

import {AuthService} from './auth/auth.service';

import {CurrentTrainingComponent} from './training/current-training/current-training.component';
import {PastTrainingsComponent} from './training/past-trainings/past-trainings.component';
import {StopTrainingComponent} from './training/current-training/stop-training.component';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {NewTrainingComponent} from './training/new-training/new-training.component';
import {HeaderComponent} from './navigation/header/header.component';
import {TrainingComponent} from './training/training.component';
import {SignupComponent} from './auth/signup/signup.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {LoginComponent} from './auth/login/login.component';
import {AppComponent} from './app.component';
import {TrainingService} from './training/training.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SignupComponent,
    WelcomeComponent,
    TrainingComponent,
    SidenavListComponent,
    NewTrainingComponent,
    StopTrainingComponent,
    PastTrainingsComponent,
    CurrentTrainingComponent
  ],
  entryComponents: [StopTrainingComponent],
  imports: [
    FormsModule,
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, TrainingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
