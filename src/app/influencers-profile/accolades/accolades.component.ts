
import { FormsModule } from '@angular/forms';
import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component({
  selector: 'app-accolades',
  templateUrl: './accolades.component.html',
  styleUrls: ['./accolades.component.scss']
})
export class AccoladesComponent  {
currentUser;
genders;
first_nameFormControl = new FormControl('', [
    Validators.required]);
selected_category;
model :any={};
Accolade = [
    {"name": "Published word"},
    {"name": "Awards/Nominations"},
    {"name": "Speaking Engagment"}

  ];
  constructor() { }

  ngOnInit() {
  }
  submit_demographic_info(){

  }
}
