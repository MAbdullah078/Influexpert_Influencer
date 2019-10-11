import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FacebookModule, FacebookService} from 'ngx-facebook';
import { AuthenticationRoutes } from './authentication.routing';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import {MatNativeDateModule,MatSelectModule,MatDialogModule,
        MatSlideToggleModule,
        MatButtonModule, MatCheckboxModule,
        MatOptionModule,MatFormFieldModule,
        MatIconModule,MatDatepickerModule, MatInputModule,
        MatRadioModule} from '@angular/material';
import {LoaderModule} from '../loader/loader.module';
import {RecapchaModule} from '../recapcha/recapcha.module';
import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule} from "angular5-social-login";
import { NewpasswordComponent } from './newpassword/newpassword.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('2076488752606610')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('635278628033-ue196e8mqlcdq7m9r4vs9rtvtfjlrrg3.apps.googleusercontent.com')
      },
    ]
);
  return config;
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    RecapchaModule,
    ReactiveFormsModule,
    FacebookModule,
    SocialLoginModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    LoaderModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatSlideToggleModule,

  ],
  declarations: [SigninComponent, SignupComponent, ForgotComponent, LockscreenComponent, ConfirmComponent, NewpasswordComponent],
  providers: [FacebookService,  {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }]
})

export class AuthenticationModule {}
