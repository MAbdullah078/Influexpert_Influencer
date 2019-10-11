import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ManageComponent} from './manage.component';
import {ManageRoutes} from './manage.routing';


@NgModule({
  imports: [CommonModule,FormsModule,ReactiveFormsModule, RouterModule.forChild(ManageRoutes) ],
  declarations: [ManageComponent],
  entryComponents:[ManageComponent ]
})
export class ManageModule {}

