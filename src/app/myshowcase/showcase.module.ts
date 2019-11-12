import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatDialogModule,MatRadioModule,
        MatNativeDateModule,MatFormFieldModule,MatDatepickerModule,
        MatCheckboxModule,MatButtonModule,MatInputModule} from '@angular/material';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MyshowcaseComponent} from './myshowcase.component';
import {LoaderModule} from '../loader/loader.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { InfluencersProfileRoutes } from './influencers-profile.routing';
// import { DemographicComponent } from './demographic/demographic.component';
import {MatSelectModule} from '@angular/material';
// import { EmploymentStatusComponent } from './employment-status/employment-status.component';
// import { AccoladesComponent } from './accolades/accolades.component';
// import { ConnectLinkedinComponent } from './connect-linkedin/connect-linkedin.component';

@NgModule({
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MatCheckboxModule, MatSelectModule,
    LoaderModule,
    NgbCarouselModule,MatButtonModule,MatDialogModule,MatFormFieldModule,
    MatInputModule,MatRadioModule,MatDatepickerModule,MatNativeDateModule ],
  declarations: [MyshowcaseComponent],
//   entryComponents:[ InfluencersProfileComponent,DemographicComponent,EmploymentStatusComponent,AccoladesComponent]
})
export class MyShowcaseModule {}

