import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import {LoaderModule} from './loader/loader.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import {CommonModule} from '@angular/common';
import {BlackgeeksRecaptchaModule} from 'recaptcha-blackgeeks';
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";
import { SocialLoginModule,AuthService } from 'angular5-social-login';
// import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular5-social-login';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';

import {NgTemplateOutlet} from '@angular/common';
import {OutletContext} from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import {AgenciesComponent} from './Agencies/Agencies.component';
import { BrandComponent } from './brand/brand.component';
import { MyshowcaseComponent } from './myshowcase/myshowcase.component';
import {PricingComponent} from './pricing/pricing.component';
import {
  BlogComponent,
  // ContactComponent,
  HowItWorksComponent,
  PrivacyAndPolicyComponent,
  TermsAndConditionsComponent,
  TermsComponent,
  WhatIsInfluexpaiComponent,
  PrivacyComponent
} from './contact/contact.component';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './_guards/index';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {MatButtonModule, MatInputModule, MatSlideToggleModule, MatIconModule, MatCardModule, MatSelectModule, MatOptionModule, MatRippleModule, MatTableModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {App_service} from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}
// import {AuthServiceConfig, SocialLoginModule, LinkedinLoginProvider, GoogleLoginProvider, FacebookLoginProvider} from 'ng4-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular5-social-login';
import { SigninComponent } from './authentication/signin/signin.component';
import { InfluencersComponent } from './influencers/influencers.component';
import { RecapchaModule } from './recapcha/recapcha.module';
import { TextMaskModule } from 'angular2-text-mask';

import { from } from 'rxjs/observable/from';
// const config= new AuthServiceConfig([
//   {
//     id: LinkedinLoginProvider.PROVIDER_ID,
//     provider: new LinkedinLoginProvider('86pmxhblr5nk3j')
//   },
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider('275856928145-q1oilas7eb0oils1rnr8u14l04ik60nq.apps.googleusercontent.com')
//   },
//   {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider('2076488752606610')
//   }
// ], false);
export function provideConfig() {



  // const config= new AuthServiceConfig([
  //   {
  //     id: LinkedinLoginProvider.PROVIDER_ID,
  //     provider: new LinkedinLoginProvider('86pmxhblr5nk3j')
  //   },
  //   {
  //     id: GoogleLoginProvider.PROVIDER_ID,
  //     provider: new GoogleLoginProvider('477803023185-j1sg6vh5tkcjd1f4as65721kcqmht6cj.apps.googleusercontent.com')
  //   },
  //   {
  //     id: FacebookLoginProvider.PROVIDER_ID,
  //     provider: new FacebookLoginProvider('2076488752606610')
  //   }
  // ], false);
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('477803023185-j1sg6vh5tkcjd1f4as65721kcqmht6cj.apps.googleusercontent.com')
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('2243800905848514')
    }

  ]);
  
  
  
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    PricingComponent,
    AuthLayoutComponent,FooterComponent,BlogComponent,AgenciesComponent,
    ContactComponent,BrandComponent,
    InfluencersComponent,
    HowItWorksComponent,
    PrivacyAndPolicyComponent, 
   
   
    PrivacyComponent,
    TermsAndConditionsComponent,
    TermsComponent,
    WhatIsInfluexpaiComponent,
    MyshowcaseComponent
            // AccountSettingComponent,
// SigninComponent
    // PostSignupComponent
  ],
  imports: [
    JwSocialButtonsModule,
    BrowserModule,
    MatSlideToggleModule,
    BlackgeeksRecaptchaModule,
    SlimLoadingBarModule,
    // PreloaderModule,
    ReactiveFormsModule,
    HttpModule,
    SocialLoginModule,
    FormsModule,
    MatIconModule,
    RecapchaModule,
    TextMaskModule,
    MatCardModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatTableModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    // JwSocialButtonsModule,


    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    LoaderModule,
    HttpClientModule,
    MatButtonModule, MatFormFieldModule, MatInputModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    NgbModule.forRoot(),
    SidebarModule.forRoot(),
  ],


  providers: [
    AuthService,
    {provide: AuthServiceConfig,  useFactory: provideConfig},
    AuthGuard, App_service],
  bootstrap: [AppComponent]
})
export class AppModule { }
