import {Component, ElementRef, OnInit, ViewContainerRef, ViewChild} from '@angular/core';
import {Inject} from '@angular/core';
import {HttpService} from '../serv/http-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {FormControl} from '@angular/forms';
import {DemographicComponent} from './demographic/demographic.component';
import {EmploymentStatusComponent} from './employment-status/employment-status.component';
import {AccoladesComponent} from './accolades/accolades.component';
import {Config} from '../config';
import {Headers, Response, Http} from '@angular/http';
import {App_service} from '../app.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-influencers-profile',
  templateUrl: './influencers-profile.component.html',
  styleUrls: ['./influencers-profile.component.scss'],
  providers: []

})
export class InfluencersProfileComponent implements OnInit {


  getContriesData: any = [];
  states: any = [];
  getCity: any = [];
  getContryData: any = [];
  getContryData1: any = [];

  animal: string;
  name: string;
  NE;
  username;
  image :File
  // phone;first_name;last_name;
  phone;first_name;last_name;address;
  currentUser: any;
  userdata: any =[];
  userdata1: any = {};
  @ViewChild('username') userNameInputRef: ElementRef;
  profile_image: any;

  constructor(public dialog: MatDialog, public toastr: ToastsManager, vcr: ViewContainerRef,
              private el: ElementRef,private Http: HttpService,private src_obj: App_service) {

    this.toastr.setRootViewContainerRef(vcr);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('', this.currentUser);

  }

  show(username: HTMLInputElement){
    this.NE = this.userNameInputRef.nativeElement.value;
    console.log('Native Element is ', this.NE)
  }

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
  EMS = [
    {show: 'Employed', code: 'e'},
    {show: 'Self-Employed', code: 's'},
    {show: 'Student', code: 'st'},
    {show: 'Retired', code: 'r'}
    // ('e', 'Employed'),
    // ('s', 'Self Employed'),
    // ('st', 'Student'),
    // ('r', 'Retired')
  ];

  genders = [
    {show: 'Male', value: 'male'},
    {show: 'Female', value: 'female'}

  ];

  ngOnInit() {
    this.username= localStorage.getItem('username');
this.loadprofilepic();

    // this.src_obj.getCountiresData().subscribe((data) => {

    //   for (let key in data) {
    //     this.getContriesData.push(data[key]);

    //   }
    // });



    this.src_obj.getUserData().subscribe((data) => {

      // console.log('data isss', data)

      this.userdata= data.message;
      this.userdata1 = data.User_data;

      // console.log(this.userdata1['email']);
      localStorage.setItem('email', this.userdata1['email']);
      localStorage.setItem('user_id', this.userdata[0]['user'])


      // for (let key in data) {
      //   this.userdata.push(data[key]);
      // }
      //     console.log(this.userdata[1][0]['employment_status'], 'userdata')
  });

  }


  
  editProfile(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new Headers();
      headers.append('Content-Type', 'application/json');
    this.Http.put(Config.api + '/influencer_profile_update/'+this.currentUser.username, JSON.stringify({
      // relationship: this.userdata[0]['relationship'],
      first_name: this.userdata[0]['first_name'],
      last_name:this.userdata[0]['last_name'],
      // education: this.userdata[0]['education'],
      phone: this.userdata[0]['phone'],
      gender: this.userdata[0]['gender'],
      city: this.userdata[0]['city'],
      state: this.userdata[0]['state'],
      country: this.userdata[0]['country'],
      address: this.userdata[0]['address'],
      // employment_status: this.userdata[0]['employment_status']
      }),{headers:headers}
      ).map((response: Response) => response.json()).subscribe(
      data => {
        this.toastr.success('Profile Updated');

      },
      error => {
        this.toastr.warning('May be some Server Side Error')

      });
  }

  openDialog_demogrhapic(): void {
    const dialogRef = this.dialog.open(DemographicComponent, {
      width: '750px',
      data: this.currentUser
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        if (result['demoghrapic_result']) {
          // alert('hogaya')
          this.toastr.success('Demographic Information Successfully saved!', 'Success');

        }
        else {

          this.toastr.error('Demographic Information Not saved!', 'Error');

        }

      }
    });
  }  
  
  
  onChange($event) {
    this.image= $event.target.files[0];
    //
    // console.log('Event on OnChange',$event.target.files[0]);
    console.log('Event on OnChange',this.image);
    this.src_obj.onUpload(this.image).subscribe((response) => {
            // console.log('set any success actions...');
            this.loadprofilepic();
            swal({
                type: 'success',
                title: 'Profile PIcture Updated.\n' +
                '\n',
                // text: 'Please check your username or password',
                showConfirmButton: false,
                width: '512px',
                timer: 2000
          
              }); 

        },
        (error) => {
          console.log('set any error actions...');
      })

      }
      loadprofilepic(){
        this.src_obj.get_profile_pic().subscribe(observer=>{
    
            // this.profile_image= observer.Message.path;
            this.profile_image= observer['message'];
            console.log('Result is ', this.profile_image);
        })
    }

  openDialog_edit(): void {
    const dialogRef = this.dialog.open(DemographicComponent, {
      width: '750px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
 


  openDialog_accolades(): void {
    const dialogRef = this.dialog.open(AccoladesComponent, {
      width: '750px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  openDialog_employ_status(): void {
    const dialogRef = this.dialog.open(EmploymentStatusComponent, {
      width: '750px',
      data: this.currentUser
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


}


const first_REGEX = '([a-zA-Z]{3,30}\s*)+';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

