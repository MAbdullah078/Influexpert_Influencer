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
import {ConnectYoutubeComponent} from './connect-youtube.component';
import {LoaderModule} from '../loader/loader.module';
import {ConnectYoutubeRoutes} from './connect-youtube.routing';
// import { DemographicComponent } from './demographic/demographic.component';

import {MatSelectModule} from '@angular/material';

// import {MatDatepickerModule} from '@angular/material';

@NgModule({
  imports: [CommonModule,FormsModule,ReactiveFormsModule, LoaderModule ,MatCheckboxModule, RouterModule.forChild(ConnectYoutubeRoutes), NgbCarouselModule,MatButtonModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatDatepickerModule,MatSelectModule,MatNativeDateModule ],
  declarations: [ConnectYoutubeComponent],
  entryComponents:[ConnectYoutubeComponent ]
})
export class ConnectYoutubeModule {}

