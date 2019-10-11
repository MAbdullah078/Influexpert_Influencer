import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm} from '@angular/forms';
import {Config} from '../config';
import {Headers, Response, Http} from '@angular/http';
import {FacebookService, InitParams, LoginResponse} from "ngx-facebook";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import {AuthService, FacebookLoginProvider, SocialUser} from 'ng4-social-login';
import Swal from "sweetalert2";
import {App_service} from '../app.service';


@Component({
  selector: 'app-connect-facebook',
  templateUrl: './connect-facebook.component.html',
  styleUrls: ['./connect-facebook.component.scss'],
  providers : [FacebookService, AuthService]
})
export class ConnectFacebookComponent implements OnInit {


  public user: any= SocialUser;
  isLoggedIn: boolean= true;
  currentUser;
  model: any= [];
  name;
  response: any;
  email;
  postYes: boolean= false;
  isFBStatus: boolean= false;

  image:File;

  constructor(private fb: FormBuilder, private router: Router, private http: Http, private FB: FacebookService,
              public toast: ToastsManager , vcr: ViewContainerRef, private socialAuthService: AuthService , private obj:App_service) {
    this.toast.setRootViewContainerRef(vcr);
    let initParams: InitParams = {
      appId: '2076488752606610',
      xfbml: true,
      version: 'v2.12'
    };
    FB.init(initParams);
  }

  ngOnInit() {
    if(this.postYes = this.isFBStatus = true)
    {
      this.get_FB_in_data();
    }
      this.checkStatus();
  }
  signUpFB() {
    this.FB.login().then((response: LoginResponse) => {
      console.log( 'response is calling SignUpFB ', response);

      this.storeFb(response['authResponse']['accessToken'].toString());

      // this.showSuccess();

    })
      .catch((error: any) => console.error(error));

  }


  storeFb(token) {
    let headers = new Headers({'Authorization': 'Bearer facebook '+ token});
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + '/get_fb_data/', {headers: headers}
    )
      .subscribe(res => {
          // console.log(res.json());
          // this.toastr.success('Account Created!', 'Success!');
          localStorage.setItem('current_User', JSON.stringify(res.json()));
        },
        error => {
          alert('exists');
        });

  }

  signinFb() {
    this.FB.logout();
    this.FB.login()
    // uid: response['authResponse']['userID'],
      .then((response: LoginResponse) => {
        let headers = new Headers({'Authorization': 'Bearer facebook ' + response['authResponse']['accessToken'].toString()});
        headers.append('Content-Type', 'application/json');
        this.http.post(Config.api + '/login_inf_socialAccnt/', {uid: response['authResponse']['userID']},{headers: headers}
        )
          .subscribe(res => {
              console.log(res.json());
              localStorage.setItem('currentUser',JSON.stringify(res.json()));
              this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            },
            error => {
              alert('Error')
            });

      })
      .catch((error: any) => console.error(error));

  }



  linkedFacebook(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      this.isLoggedIn = false;
      this.showSuccess();
    })
  }



  showSuccess(){
    this.toast.success('Please Save your Profile!', 'Success!')
  }

  post_FB(f: NgForm){
    let username= localStorage.getItem('username')
    // console.log('Data isss', this.user.name, this.user.email, this.user.photoUrl);
    this.obj.postFBData(
      this.user.name,
      this.user.email,
      this.user.photoUrl,
      username
    ).subscribe(
      data => {
        // console.log('data is ........', data);
        this.postYes= true;
        // console.log('Email is............', localStorage.getItem('linkedIn_User_Email'))

      },
      error => {

        // Swal('Profile Not Get', error.toString(), 'error');

      });
  }
  get_FB_in_data(){
    this.obj.getFBData().subscribe(
      data => {

        this.response= data;
        // Swal('Profile get Sucessfully', '', 'success');
      },
      error => {

        // Swal('Login to Connect Your Profile', '',  'error');
        this.toast.warning('Login to Connect Your Profile');

      });

  }

  checkStatus(){
    this.obj.Facebook_Status().subscribe(
      data => {
        if(data['Status'] == true){

          this.isFBStatus = true;
        }
        else if(data['Status'] == false)
        {

          this.isFBStatus= false;

        }
      });
  }

}
