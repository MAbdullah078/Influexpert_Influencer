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
import {ConnectPinterestComponent} from './connect-pinterest.component';
// import { DemographicComponent } from './demographic/demographic.component';
import {ConnectPinterestRoutes} from './connect-pinterest.routing';

import {MatSelectModule} from '@angular/material';

// import {MatDatepickerModule} from '@angular/material';

@NgModule({
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MatCheckboxModule, RouterModule.forChild(ConnectPinterestRoutes), NgbCarouselModule,MatButtonModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatDatepickerModule,MatSelectModule,MatNativeDateModule ],
  declarations: [ConnectPinterestComponent],
  entryComponents:[ConnectPinterestComponent ]
})
export class ConnectPinterestModule {}

