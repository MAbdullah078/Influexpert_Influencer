import { Routes } from '@angular/router';
import {ConfirmComponent} from './confirm/confirm.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import {NewpasswordComponent} from './newpassword/newpassword.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
      path: 'signin',
      component: SigninComponent
    },
      {
      path: 'signup',
      component: SignupComponent
    }, {
      path: 'forgot',
      component: ForgotComponent
    },
      {
        path:'confirm',
        component: ConfirmComponent
      },{
      path: 'lockscreen',
      component: LockscreenComponent
    },
      {
        path: 'new-password',
        component: NewpasswordComponent
      }
    ]
  }
];
