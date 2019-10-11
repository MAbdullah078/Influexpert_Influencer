import { Routes } from '@angular/router';

import { PostSignupComponent } from './post-signup.component'

import { AuthGuard } from '../_guards/index';
export const PostSignupRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'onboarding',
      component: PostSignupComponent,
      canActivate: [AuthGuard]
    }]
  }
];
