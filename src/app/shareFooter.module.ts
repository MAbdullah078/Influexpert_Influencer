import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component'
import {CommonModule} from '@angular/common'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
    declarations:[
        FooterComponent
    ],
    imports:[
        CommonModule,RouterModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,
    ],
    exports:[
        FooterComponent
    ]
})
export class ShareFooterModule{}