import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {Headers, Response, Http} from '@angular/http';
import {Config} from "../../config";


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const first_REGEX = "([a-zA-Z]{3,30}\s*)+";


@Component({
  selector: 'app-demographic',
  templateUrl: './demographic.component.html',

})
export class DemographicComponent {


  demo_valid = new FormGroup({
    // 'gender': new FormControl('', [
    //   Validators.required]),


    // 'relation': new FormControl('', [
    //   Validators.required,
    //   Validators.pattern(first_REGEX)]),

    //       'education': new FormControl('', [
    //   Validators.required,
    //   Validators.pattern(first_REGEX)]),

  });


  selected_category;
  pet;
  model: any = {};


////////////////////////////////////////////////////
// GENDERS = (
//     ('male', 'Male'),
//     ('female', 'Female')
// )
  RElATIONSHIPS = [
    {show: 'Single', code: 's'},
    {show: 'Married', code: 'm'},
    {show: 'Domestic Parent', code: 'd'}
  ];
  EDUCATIONS = [
    {show: 'College', code: 'c'},
    {show: 'No College', code: 'n'},
    {show: 'Graduation', code: 'g'}
  ];

  genders = [
    {show: 'Male', value: 'male'},
    {show: 'Female', value: 'female'}

  ];
  PET = [
    {show: 'Cats', code: 'c'},
    {show: 'Dogs', code: 'd'},
    {show: 'Hamsters', code: 'h'},
    {show: 'Turtles', code: 't'},
    {show: 'Parrots', code: 'p'},
    {show: 'Fish', code: 'f'},
    {show: 'Other', code: 'o'},

  ];
  ETHS = [
    {show: 'Asian American', code: 'aa'},
    {show: 'Asian', code: 'a'},
    {show: 'African American', code: 'af'},
    {show: 'Caucasian', code: 'c'},
    {show: 'Hispanic', code: 'h'},
    {show: 'Native American', code: 'na'},
    {show: 'Multiracial', code: 'm'}

  ];


  posting_demographic_info: boolean = false;

  constructor(private _formBuilder: FormBuilder, private http: Http,
              public dialogRef: MatDialogRef<DemographicComponent>,
              @Inject(MAT_DIALOG_DATA) public currentUser: any) {
    if(!this.currentUser['kids']){
      this.currentUser['kids'] = false

    }
  }

  onNoClick(): void {
    this.dialogRef.close({demoghrapic_result: false});
  }


  submit_demographic_info(f) {
    console.log("vlause of ", f)
    // console.log(this.basic_profile_group.value)
    this.posting_demographic_info = true;
    this.post_demographic_info(f.value);
  }


  post_demographic_info(value: any) {


    console.log("checking  values", value)
    // this.step3disable = true;
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    this.http.post(Config.api + '/update_influencer_profile_demographic_info/', value, {headers: headers}
    )
      .subscribe(res => {
          this.currentUser = res.json();
          this.posting_demographic_info = false;
          localStorage.setItem('currentUser', JSON.stringify(res.json()));
          // this.successfully_submitted = true;
          this.dialogRef.close({demoghrapic_result: true});
        },
        error => {
          this.dialogRef.close({demoghrapic_result: false});
        });
  }


}
