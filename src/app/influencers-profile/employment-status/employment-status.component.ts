import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {Headers, Response, Http} from '@angular/http';
import {Config} from "../../config";


@Component({
  selector: 'app-employment-status',
  templateUrl: './employment-status.component.html',
  styleUrls: ['./employment-status.component.scss']
})
export class EmploymentStatusComponent {
  posting_employee_info: boolean = false;

// currentUser;
  demographic_group = new FormGroup({
    'asdd': new FormControl('', [
      Validators.required]),

  });

  Accolade =
    [
      {"name": "Employed", "code": 'e'},
      {"name": "Self Employed", "code": 'e'},
      {"name": "Student", "code": 'e'},
      {"name": "Retire", "code": 'e'}
    ];


  constructor(private http: Http,
              public dialogRef: MatDialogRef<EmploymentStatusComponent>, @Inject(MAT_DIALOG_DATA) public currentUser: any) {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //    console.log("ssssssssssssss", this.currentUser);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit_employee_info(f) {
    // console.log(this.basic_profile_group.value)
    this.posting_employee_info = true;
    this.post_employee_info(f.value);
  }

  connect_linkedin() {
    alert('opened');
    let x = screen.width / 2 - 700 / 2;
    let y = screen.height / 2 - 450 / 2;
    let strWindowFeatures = "location=yes,height=624,width=584,scrollbars=yes,status=yes,left=" + x + ",top=" + y;
    // let URL = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77a1j72f9bf5ld&redirect_uri="+Config.api+"/influencer/profile/connect-linkedin&state=49f98033f3b6a37ef2d42be0399349e46fe7b37skladkas9eed7e5cd&scope=r_basicprofile+r_emailaddress";
    let URL = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77a1j72f9bf5ld&redirect_uri=http://localhost:4200/profile/connect-linkedin&state=49f98033f3b6a37ef2d42be0399349e46fe7b37skladkas9eed7e5cd&scope=r_basicprofile+r_emailaddress";

    let win = window.open(URL, "_blank", strWindowFeatures);
    if(win.status){
      alert(win.status);
    }
  }

  post_employee_info(value) {

    console.log("checking  values", value);
    // this.step3disable = true;
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    this.http.post(Config.api + '/update_influencer_profile_contact_info/', value, {headers: headers}

    )
      .subscribe(res => {
          this.currentUser = res.json();
          this.posting_employee_info = false;
          localStorage.setItem('currentUser', JSON.stringify(res.json()));
          // this.successfully_submitted = true;
          this.dialogRef.close({contact_result: true});
        },
        error => {
          this.dialogRef.close({contact_result: false});
        });
  }


}
