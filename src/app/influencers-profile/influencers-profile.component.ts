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
// import { HttpClient } from 'selenium-webdriver/http';
import {HttpClient } from '@angular/common/http';

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
  allcountry;
  animal: string;
  name: string;
  NE;
  username;
  image :File
  pictures:any
  url: any = 'JPG, GIF, PNG';
  // phone;first_name;last_name;
  phone;first_name;last_name;address;
  currentUser: any;
  userdata: any =[];
  userdata1: any = {};
  @ViewChild('username') userNameInputRef: ElementRef;
  profile_image: any;
  public phoneMask = ['+', '1', '-', /[1-9]/, /\d/, /\d/, '-',  /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor(public dialog: MatDialog, public toastr: ToastsManager, vcr: ViewContainerRef, private https:HttpClient,
              private el: ElementRef,private Http: HttpService,private src_obj: App_service) {

    this.toastr.setRootViewContainerRef(vcr);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log('', this.currentUser.token);

  }

  show(username: HTMLInputElement){
    this.NE = this.userNameInputRef.nativeElement.value;
    // console.log('Native Element is ', this.NE)
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
    this.getcountry();
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
    // console.log(this.pictures)
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');     
    headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
    this.Http.put(Config.api + '/influencer_profile_update/'+this.currentUser.username, JSON.stringify({
      // relationship: this.userdata[0]['relationship'],
      first_name: this.userdata[0]['first_name'],
      last_name:this.userdata[0]['last_name'],
      // education: this.userdata[0]['education'],
      phone: this.userdata[0]['phone'].split('_').join('').split('-').join('').split('+').join(''),
      gender: this.userdata[0]['gender'],
      city: this.userdata[0]['city'],
      state: this.userdata[0]['state'],
      country: this.userdata[0]['country'],
      address: this.userdata[0]['address'],
      'image_path':this.pictures,
      // employment_status: this.userdata[0]['employment_status']
      }),{headers:headers}
      ).map((response: Response) => response.json()).subscribe(
      data => {
       swal('sucess',"Your profile is updated sucessfully")
this.loadprofilepic();
      },
      error => {
        swal('error',"Some server side issue")

      });
  }

  openDialog_demogrhapic(): void {
    const dialogRef = this.dialog.open(DemographicComponent, {
      width: '750px',
      data: this.currentUser
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(result);
      if (result) {
        if (result['demoghrapic_result']) {
          // alert('hogaya')
          this.toastr.success('Demographic Information Successfully saved', 'Success');

        }
        else {

          this.toastr.error('Demographic Information Not saved', 'Error');

        }

      }
    });
  }  
  
  
  // onChange($event) {
  //   this.image= $event.target.files[0];
  //   //
  //   // console.log('Event on OnChange',$event.target.files[0]);
  //   console.log('Event on OnChange',this.image);
  //   this.src_obj.onUpload(this.image).subscribe((response) => {
  //           // console.log('set any success actions...');
  //           this.loadprofilepic();
  //           swal({
  //               type: 'success',
  //               title: 'Profile PIcture Updated.\n' +
  //               '\n',
  //               // text: 'Please check your username or password',
  //               showConfirmButton: false,
  //               width: '512px',
  //               timer: 2000
          
  //             }); 

  //       },
  //       (error) => {
  //         console.log('set any error actions...');
  //     })

  //     }
  onChange(event: EventTarget) {
    // alert(2)
    this.pictures = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.pictures.append('fileToUpload', target.files[0]);
    // console.log(this.pictures);
    // console.log('Name is :',  this.pictures)
    // //alert(this.pictures);
  }
      readUrl(event: any) {
        // alert(1)
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
      
          reader.onload = (e: any) => {
            this.url = e.target.result;
            // console.log(this.url);
          };
        
          reader.readAsDataURL(event.target.files[0]);
        }
        this.upload()
      }
      upload() {
        this.https.post(
          Config.Imageurlupload,
          this.pictures, { responseType: 'text' }).subscribe(data => {
            if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.") {
            }
            else {     
              // console.log(data);
              // //alert(data);
              this.pictures = data;
              // this.onSubmit();
              // //alert('ok')
            }
          });
      }
      loadprofilepic(){
        this.src_obj.get_profile_pic().subscribe(observer=>{
    
            // this.profile_image= observer.Message.path;
            this.profile_image= observer['message'];
            // console.log('Result is ', this.profile_image);
            // alert(this.profile_image)
        })
    }

  openDialog_edit(): void {
    const dialogRef = this.dialog.open(DemographicComponent, {
      width: '750px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.animal = result;
    });
  }
 
  getcountry(){
  this.src_obj.getcounty().subscribe( data =>{
    // console.log(data.countries, 'Mahad')
    this.allcountry = data.countries;
    // console.log(this.allcountry);
  },
  error=>{
    // console.log(error, 'Mahad')
  })
  }

  openDialog_accolades(): void {
    const dialogRef = this.dialog.open(AccoladesComponent, {
      width: '750px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.animal = result;
    });
  }
  openDialog_employ_status(): void {
    const dialogRef = this.dialog.open(EmploymentStatusComponent, {
      width: '750px',
      data: this.currentUser
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.animal = result;
    });
  }


}


const first_REGEX = '([a-zA-Z]{3,30}\s*)+';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

