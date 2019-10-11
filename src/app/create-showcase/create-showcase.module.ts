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
import {MatSelectModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material';
import {MatOptionModule} from '@angular/material';
import {FileValidatorDirective} from './FileValidator.directive';
import {MatStepperModule} from '@angular/material';
import {CreateShowcaseComponent} from './create-showcase.component';
import {CreateShowCaseRoutes} from './create-showcase.routing';
import {LoaderModule} from '../loader/loader.module';

@NgModule({
  imports: [CommonModule, MatOptionModule,   FormsModule,MatStepperModule, LoaderModule, ReactiveFormsModule,MatCheckboxModule, RouterModule.forChild(CreateShowCaseRoutes), NgbCarouselModule,MatButtonModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatDatepickerModule,MatSelectModule,MatNativeDateModule ],
  declarations: [CreateShowcaseComponent, FileValidatorDirective],
  entryComponents:[CreateShowcaseComponent ]
})
export class CreateShowcaseModule {}

