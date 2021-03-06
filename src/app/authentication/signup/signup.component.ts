import {Component, OnInit, ViewChild} from '@angular/core';
// import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Headers, Response, Http} from '@angular/http';
import {FacebookService, InitParams, LoginResponse} from 'ngx-facebook';
import { Router, RouterModule,NavigationEnd } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import {App_service} from '../../app.service';
import {Config} from '../../config';
import {HttpService} from '../../serv/http-service';
import {AuthService, GoogleLoginProvider} from "angular5-social-login";
import Swal from 'sweetalert2'
import {RecapchaService} from '../../recapcha/recapcha.service';
import { error } from 'util';
import swal from 'sweetalert2';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

declare const Buffer;
const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers:[RecapchaService]
})
export class SignupComponent implements OnInit {

  public form: FormGroup;
  hide;
  currentUser:any;
  recaptcha= true;
  consumerkey: any = 'FjRW5PnI1hE2TvpYuGSxEeGKY';
  consumersecret: any = 'hDBBlbxN3Ua8w4NQ2cbddy1pD3YULnEyas3jVWMXhxMLM3H7ir';
  bearertoken: any = '';
  public model: any = {};
  sub: boolean;
  password2;
  wrongPass:boolean;
  step;
  popus = 0;
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
    {show: 'Student', code: 'c'},
    {show: 'Retired', code: 'r'}
  ];

  genders = [
    {show: 'Male', value: 'male'},
    {show: 'Female', value: 'female'}

  ];
  states: any = [];
  getContriesData: any = [];
  getContryData: any = [];
  getContryData1: any = [];
  getCity: any = [];
  indexes: any= [];
  // registerUser: FormGroup;
  submitted = false;
  check:boolean;
  emails:boolean;
  digitsOnly = '^[0-9,-]+$';
  public phoneMask = ['+', '1', '-', /[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  email = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  password_regex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[\/\\\!\"#$%&()*+,£^.:;=?\\\\[\\]\\-\'<>~|@_{}]).{8,}$';
  usernameOnly = '[a-zA-Z0-9_.]+';
  userchk: any;
  isInvalid:boolean
  registerUser = this.fb.group({
    userName: ['', Validators.compose([Validators.required, Validators.pattern(this.usernameOnly), Validators.minLength(3)])],
    // fullName: ['', Validators.required],
    firstName:['', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z ]+"),Validators.minLength(2),Validators.maxLength(64)])],
    lastName:['',Validators.compose([Validators.required, Validators.pattern("[a-zA-Z ]+"),Validators.minLength(2),Validators.maxLength(64)])],
    eMail: ['',Validators.compose([ Validators.required, Validators.pattern(this.email)])],
    phoNe: ['', Validators.required],
    passWord: ['',Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(this.password_regex), Validators.maxLength(100)])],
    relationShip: ['', Validators.required],
    employement_Status: ['', Validators.required],
    zipcode: ['', Validators.compose([Validators.required, Validators.pattern(this.digitsOnly), Validators.minLength(5)])],
    gendeR: ['', Validators.required],
    address:['',  Validators.compose([Validators.required, Validators.pattern(this.usernameOnly)])],
    password2:['', [Validators.required]],
    eduCation: ['', Validators.required],
    ciTy: ['', Validators.required],
    counTry: ['', Validators.required],
    staTe: ['', Validators.required],
    
  });
  public change2(event: any): void {
    var phn = this.registerUser.controls['phoNe'].value.split('_').join('').split('-').join('').split('+').join('').length
    if (phn < 11) {
      this.isInvalid = true;
      // alert(2)
    }
    else {
      this.isInvalid = false;
    }
    
  }
  vin_Data = { city: "", state: "", country: "" };
  vin_Data2 = { city2: "", state2: "", country2: "" };
  constructor(private http: Http, private loaderHttp: HttpService,private fb: FormBuilder, private router: Router, private fB: FacebookService, private _nav : Router,
  public toastr: ToastsManager, vcr: ViewContainerRef, private recapcha: RecapchaService, private socialAuthService: AuthService, private srvc_obj: App_service) {

    this.toastr.setRootViewContainerRef(vcr);

    let initParams: InitParams = {
      // appId: '886122871552158',
      appId: '2076488752606610',
      xfbml: true,
      version: 'v2.12'
    };
    fB.init(initParams);
    // this.toastr.success('You are awesome!', 'Success!');
  }
  storeFb(token) {
    let headers = new Headers({'Authorization': 'Bearer facebook ' + token});
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + '/get_fb_data/', {headers: headers})
      .subscribe(res => {

          localStorage.setItem('currentUser', JSON.stringify(res.json()));
          this._nav.navigate(['/onboarding']);
        },
        error => {
          // alert('exists');
          this.showError();
        });

  }


  storeGoogle(token) {
    let headers = new Headers({'Authorization': 'Bearer google-oauth2 ' + token});
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + '/get_google_data/', {headers: headers}
    )
      .subscribe(res => {
          // console.log(res.json());
          // this.toastr.success('Account Created!', 'Success!');
          localStorage.setItem('currentUser', JSON.stringify(res.json()));
          this._nav.navigate(['/onboarding']);
        },
        error => {
          alert('exists');
          this.showError();
        });

  }
  signinGoogle(){
    let socialPlatformProvider;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log('GOOGLE' + ' sign in data : ' , userData);
        this.storeGoogle(userData['token'].toString());
      }
    );
  }



  ngOnInit() {

    this.check=false;
    this.emails=false
    this.isInvalid=false
// this.wrongPass= false;
    this.fB.logout();
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: password,
      confirmPassword: confirmPassword
    });
    this.srvc_obj.getCountiresData().subscribe((data) => {

        for (let key in data) {
          this.getContriesData.push(data[key]);

        }
      });
  }
  allcountry;
  ngAfterViewInit(){
    this.srvc_obj.getcounty().subscribe( data =>{
      this.allcountry = data['countries'];
      console.log(this.allcountry);
    })
  }

  getCities(value){

        if(this.popus=== 0) {
          for (let item of this.getContryData1) {

            if (item.name === value) {
              this.indexes = item
            }
          }
          for (let key in this.indexes.cities) {
            this.getCity.push(this.indexes.cities[key]);
            // console.log(this.getCity);
            this.popus++;
          }
        }
        else if(this.popus>=1) {
          this.getCity=[];
          for (let item of this.getContryData1) {

            if (item.name === value) {
              this.indexes = item
            }
          }
          for (let key in this.indexes.cities) {
            this.getCity.push(this.indexes.cities[key]);
            // console.log(this.getCity);
          }
        }

  }
        onSelect(value)

        {
          console.log('values is', value);
          if(this.popus === 0){

            for(let item of this.getContriesData){
              if(item.name === value){
                this.getContryData = item
              }
            }
            for (let key in this.getContryData.states) {
              this.getContryData1.push(this.getContryData.states[key]);
              // Use `key` and `value`
              this.popus = this.popus +1;

            }
          }
          else if(this.popus >= 1) {
            this.getContryData1 =[];
            // console.log('country is .......', value);
            for(let item of this.getContriesData) {
              if(item.name === value){
                // console.log('Iten is', item)
                this.getContryData = item
              }
            }
            for (let key in this.getContryData.states) {
              this.getContryData1.push(this.getContryData.states[key]);

            }
          }

      }

  showSuccess() {
        this.toastr.success('You!', 'Success!');
      }

    showError() {
      this.toastr.error('This user already exist!');
    }
    show_Sgnup_Error() {
      this.toastr.error('Please entered correct data!');
    }

    showWarning() {
      this.toastr.warning('You are being warned.', 'Alert!');
    }

    showInfo() {
      this.toastr.info('Just some information for you.');
    }

    showCustom() {
      this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
    }
    username;


    usernamecheck(val){
    
      this.srvc_obj.checkuser(val).subscribe((data) => {
        this.username = data;
        
        this.check=false;
    
      },
      error=>{
        if(error.status==400){
          this.check=true;
       
        }

      }

    
      )  
    }
    emailcheck(val){
      console.log(val)
      this.srvc_obj.checkemail(val).subscribe((data) => {
        this.username = data;
        
        this.emails=false;
    
      },
      error=>{
        if(error.status==400){
          this.emails=true;
    
        }

      }


    
      )  
      
    }


  getTwAccessToken() {
    console.log("hello");
    let header = this.consumerkey + ':' + this.consumersecret;
    let encheader = new Buffer(header).toString('base64');
    let finalheader = 'Basic ' + encheader;

    this.http.post('https://api.twitter.com/oauth2/token', {
      form: {'grant_type': 'client_credentials'},
      headers: {Authorization: finalheader}
    }).map((response : Response) => {
      // login successful if there's a jwt token in the response
      console.log(response + 'oyyy');
      this.bearertoken = response.json().access_token;
      if (this.bearertoken) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(this.bearertoken);
      }
    });
  }
  invalid
  zipcode2;
  endRequest
  zipcodeCheck(zipcode1) {
    if (zipcode1.length > 4) {
      this.endRequest = this.srvc_obj.zipcode(zipcode1).subscribe(
        data => {
          this.vin_Data.city = data['city'];
          this.vin_Data.state = data['state'];
          this.vin_Data.country = data['country'];
        },
          error => {
            error.status== 400
            this.invalid=error.status;
            delete this.vin_Data.city;
            delete this.vin_Data.state;
            delete this.vin_Data.country;
      });
    }
  }
  zipcodeCheck2(zipcode2) {
    if (zipcode2.length > 4) {
      this.endRequest = this.srvc_obj.zipcode(zipcode2).subscribe(
        data => {
          this.vin_Data2.city2 = data['city'];
          this.vin_Data2.state2 = data['state'];
          this.vin_Data2.country2 = data['country'];
        },
          error => {
            error.status== 400
            this.invalid=error.status;
            delete this.vin_Data2.city2;
            delete this.vin_Data2.state2;
            delete this.vin_Data2.country2;
      });
    }
  }

  signUpFB() {
    this.fB.login()
      .then((response: LoginResponse) => {
        console.log(response);

        this.storeFb(response['authResponse']['accessToken'].toString());

        // this.showSuccess();

      })
      .catch((error: any) => console.error(error));

  }
  get f() { return this.registerUser.controls; }


  onSubmit() {

    // this.submitted = true;
    // this.recaptcha = this.recapcha.check();
    console.log( this.registerUser.controls['userName'].value,
    this.registerUser.controls['firstName'].value,
    this.registerUser.controls['lastName'].value,
    this.registerUser.controls['eMail'].value,
    this.registerUser.controls['passWord'].value,
    this.registerUser.controls['counTry'].value,
    this.registerUser.controls['address'].value, this.registerUser.controls['phoNe'].value.split('_').join('').split('-').join('').split('+').join(''),
    this.registerUser.controls['staTe'].value,
    this.registerUser.controls['ciTy'].value,
    this.registerUser.controls['gendeR'].value)
    if ( this.recapcha.check()){
    if ( this.check==false && this.wrongPass== true &&this.emails==false&&
    this.registerUser.controls.firstName.valid ||this.registerUser.controls.lastName.valid ||this.registerUser.controls.eMail.valid||this.registerUser.controls.passWord.valid
      &&this.registerUser.controls.passWord.valid
      &&this.registerUser.controls.counTry.valid
      &&this.registerUser.controls.address.valid
      &&this.registerUser.controls.phoNe.valid
      &&this.registerUser.controls.staTe.valid
      &&this.registerUser.controls.ciTy.valid
      &&this.registerUser.controls.gendeR.valid
      &&this.registerUser.controls.userName.valid) {
      this.srvc_obj.register_user(
        this.registerUser.controls['userName'].value,
        this.registerUser.controls['firstName'].value,
        this.registerUser.controls['lastName'].value,
        this.registerUser.controls['eMail'].value,
        this.registerUser.controls['passWord'].value,
        this.registerUser.controls['counTry'].value,
        this.registerUser.controls['address'].value,
        this.model.relationship='null',
        this.model.education='null',
        this.registerUser.controls['phoNe'].value.split('_').join('').split('-').join('').split('+').join(''),
        this.registerUser.controls['staTe'].value,
        this.registerUser.controls['ciTy'].value,
        this.model.employment_status='null',
        this.registerUser.controls['gendeR'].value
      
      ).subscribe((data) => {

          this._nav.navigate(['/authentication/signin']);
          Swal(
            'Successfull Submitted',
            'Please Check your Email for Account Activation',
            'success'
          )
        },
        (err) => {
          this.show_Sgnup_Error();
        });
    }
  }
    else if(this.registerUser.controls.firstName.invalid ||this.registerUser.controls.lastName.invalid ||this.registerUser.controls.eMail.invalid||this.registerUser.controls.passWord.invalid
      ||this.registerUser.controls.passWord.invalid
      ||this.registerUser.controls.counTry.invalid
      ||this.registerUser.controls.address.invalid
      ||this.registerUser.controls.phoNe.invalid
      ||this.registerUser.controls.staTe.invalid
      ||this.registerUser.controls.ciTy.invalid
      ||this.registerUser.controls.gendeR.invalid
      ||this.registerUser.controls.userName.invalid
      ) {
      Swal('oops','please provide the information and then click on sign up button','error');
    }
    else{
      swal({
        type: 'error',
        title: 'Please confirm that you are not a robot',
        showConfirmButton: false,
        width: '512px',
        timer: 2000
      });
    }
    
  }
  showAllert(){
    if(this.model.password!= this.password2){
    
      // Swal('oops','Password did not match','error');
      this.wrongPass= false;
  }
  else {
      this.wrongPass= true;
  }
  }

}
