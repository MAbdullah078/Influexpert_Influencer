import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {FacebookModule, FacebookService} from 'ngx-facebook';
import { PostSignupRoutes } from './post-signup.routing';
import { PostSignupComponent, AddBlogDialog } from './post-signup.component';
// import { SignupComponent } from './signup/signup.component';
// import { ForgotComponent } from './forgot/forgot.component';
// import { LockscreenComponent } from './lockscreen/lockscreen.component';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepperModule, MatInputModule, MatButtonModule, MatSelectModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
// import {MatInputModule} from '@angular/material';
// import {MatButtonModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
// import {MatDialogModule} from '@angular/material';
import {MatRadioModule} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PostSignupRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule
    // BrowserAnimationsModule
    // FacebookModule
  ],
  declarations: [PostSignupComponent,AddBlogDialog],
  entryComponents: [AddBlogDialog]
  // providers: [FacebookService]
})

export class PostSignupModule {}
