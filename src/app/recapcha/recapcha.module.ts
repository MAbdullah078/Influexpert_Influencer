import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule,MatDialogModule, MatInputModule, MatCardModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import { HttpModule } from '@angular/http';
import {RecapchaComponent} from './recapcha.component';


@NgModule({
    declarations: [
        RecapchaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        MatCardModule,
        MatCheckboxModule,
        HttpModule,
        MatButtonModule,
    ],
    exports: [
        RecapchaComponent
    ]

})
export class RecapchaModule { }
