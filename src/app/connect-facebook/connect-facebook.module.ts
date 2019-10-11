import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxModule} from '@angular/material';
import {MatNativeDateModule} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatRadioModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material';
import {ConnectFacebookComponent} from './connect-facebook.component';
import {ConnectFacebookRoutes} from './connect-facebook.routing';
import {LoaderModule} from '../loader/loader.module';
// import { DemographicComponent } from './demographic/demographic.component';

import {MatSelectModule} from '@angular/material';

// import {MatDatepickerModule} from '@angular/material';

@NgModule({
  imports: [CommonModule,FormsModule, LoaderModule, ReactiveFormsModule,MatCheckboxModule, RouterModule.forChild(ConnectFacebookRoutes), NgbCarouselModule,MatButtonModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatDatepickerModule,MatSelectModule,MatNativeDateModule ],
  declarations: [ConnectFacebookComponent],
  entryComponents:[ConnectFacebookComponent ]
})
export class ConnectFacebookModule {}

