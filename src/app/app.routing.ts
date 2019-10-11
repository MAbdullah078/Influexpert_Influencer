import {Routes} from '@angular/router';
import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {PostSignupComponent} from "./post-signup/post-signup.component";

import {
  BlogComponent,
  ContactComponent,
  HowItWorksComponent,
  PrivacyAndPolicyComponent,
  TermsAndConditionsComponent,
  TermsComponent,
  PrivacyComponent,
  WhatIsInfluexpaiComponent
} from './contact/contact.component';
import {BrandComponent} from './brand/brand.component';
import {InfluencersComponent} from './influencers/influencers.component';
import {AgenciesComponent} from './Agencies/Agencies.component'
import { AuthGuard } from './_guards/index';
import {PricingComponent} from './pricing/pricing.component';



import { SigninComponent } from './authentication/signin/signin.component';
import { MyshowcaseComponent } from './myshowcase/myshowcase.component';



export const AppRoutes: Routes = [
  {
  
  
    path : 'agencies', component: AgenciesComponent
},
{
    path: 'contact',
    component: ContactComponent
},
{
    path: 'what-is-InfluExpAI',
    component: WhatIsInfluexpaiComponent
},
{
    path: 'How-It-Works',
    component: HowItWorksComponent
},
{
    path: 'Terms-and-Conditions',
    component: TermsAndConditionsComponent
},
{
    path: 'terms',
    component: TermsComponent
},
{
    path: 'privacy_policy',
    component: PrivacyAndPolicyComponent
},
{
    path: 'privacy',
    component: PrivacyComponent
},

{
    path: 'brand',
    component: BrandComponent
},
{
    path: 'influencers',
    component: InfluencersComponent
},
{
    path: 'blog',
    component: BlogComponent
},
{
  path: '',
  component: AdminLayoutComponent,
  children: [
    {
    path: '',
    loadChildren: './influencers-profile/influencers-profile.module#ProfileModule' ,canActivate: [AuthGuard]
  }
  , {
    path: 'components',
    loadChildren: './components/components.module#ComponentsModule', canActivate: [AuthGuard]
  },{
    path: 'profile',
    loadChildren: './influencers-profile/influencers-profile.module#ProfileModule' , canActivate: [AuthGuard]
  },
    {
    path: 'icons',
    loadChildren: './icons/icons.module#IconsModule' ,canActivate: [AuthGuard]
  }, {
    path: 'cards',
    loadChildren: './cards/cards.module#CardsModule' ,canActivate: [AuthGuard]
  },
    {
      path: 'settings',
      loadChildren: './settings/settings.module#SettingsModule' , canActivate: [AuthGuard]
    },
    {
      path: 'connect-blogger',
      loadChildren: './connect-blogger/connect-blogger.module#ConnectBloggerModule' , canActivate: [AuthGuard]
    },
    {
      path: 'connect-facebook',
      loadChildren: './connect-facebook/connect-facebook.module#ConnectFacebookModule' , canActivate: [AuthGuard]
    },

    {
      path: 'connect-youtube',
      loadChildren: './connect-youtube/connect-youtube.module#ConnectYoutubeModule' , canActivate: [AuthGuard]
    },

    {
      path: 'connect_linkedin',
      loadChildren: './connect-linkedin/connect-linkedin.module#ConnectLinkedinModule' , canActivate: [AuthGuard]
    },
    {
      path: 'connect-pinterest',
      loadChildren: './connect-pinterest/connect-pinterest.module#ConnectPinterestModule' , canActivate: [AuthGuard]
    },

    {
      path: 'connect-instagram',
      loadChildren: './connect-instagram/connect-instagram.module#ConnectInstagramModule' , canActivate: [AuthGuard]
    },

    {
      path: 'connect-twitter',
      loadChildren: './connect-twitter/connect-twitter.module#ConnectTwitterModule' , canActivate: [AuthGuard]
    },
    {
      path: 'create-showcase',
      loadChildren: './create-showcase/create-showcase.module#CreateShowcaseModule' , canActivate: [AuthGuard]
    },
   {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule' ,canActivate: [AuthGuard]
  },
    {
    path: 'datatable',
    loadChildren: './datatable/datatable.module#DatatableModule' ,canActivate: [AuthGuard]
  }, {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',canActivate: [AuthGuard]
  }, {
    path: 'pages',
    loadChildren: './pages/pages.module#PagesModule',canActivate: [AuthGuard]
  }, {
    path: 'taskboard',
    loadChildren: './taskboard/taskboard.module#TaskboardModule' ,canActivate: [AuthGuard]
  }, {
    path: 'calendar',
    loadChildren: './fullcalendar/fullcalendar.module#FullcalendarModule' ,canActivate: [AuthGuard]
  }, {
    path: 'media',
    loadChildren: './media/media.module#MediaModule',canActivate: [AuthGuard]
  }, {
    path: 'widgets',
    loadChildren: './widgets/widgets.module#WidgetsModule',canActivate: [AuthGuard]
  }, {
    path: 'social',
    loadChildren: './social/social.module#SocialModule',canActivate: [AuthGuard]
  },
    {
      path: 'manage-profiles',
      loadChildren: './manage/manage.module#ManageModule',canActivate: [AuthGuard]
    },
    {
    path: 'docs',
    loadChildren: './docs/docs.module#DocsModule',canActivate: [AuthGuard]
  }]
},
 

{path: 'myshowcase', component: MyshowcaseComponent},
{ path: 'pricing', component: PricingComponent },
{path: 'contactus', component: ContactComponent},



 {
  path: '',
  component: AuthLayoutComponent,
  children: [
    {
      path: '',
      loadChildren: './post-signup/post-signup.module#PostSignupModule'
    },
//     {path: 'forgot',
//  loadChildren: './forgot/forgot.module#ForgotModule'},
    // {
    //   path: 'signin',
    //   component: SigninComponent
    // },


    // { path: 'forgot',  loadChildren: './authentication/forgot/forgot.module#ForgotModule' },
    {
      path: 'authentication',
      loadChildren: './authentication/authentication.module#AuthenticationModule'
    }, {
      path: 'error',
      loadChildren: './error/error.module#ErrorModule'
    }, {
      path: 'landing',
      loadChildren: './landing/landing.module#LandingModule'
    }
    ]
},

  // {
  //   path: '**',
  //   redirectTo: 'error/404'
  // }
];

