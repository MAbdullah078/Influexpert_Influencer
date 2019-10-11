import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {AuthService, SocialUser, LinkedinLoginProvider} from 'ng4-social-login';
import {LoginProviderClass} from 'angular5-social-login';
import {ToastsManager, ToastOptions} from 'ng2-toastr';
import {App_service} from '../app.service';
import Swal from "sweetalert2";
import {HttpService} from '../serv/http-service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connect-linkedin',
  templateUrl: './connect-linkedin.component.html',
  styleUrls: ['./connect-linkedin.component.scss'],
  providers:[AuthService]
})
export class ConnectLinkedinComponent implements OnInit {
  model: any= [];
  name;
  response: any;
  response1: any;
  email;

  username;
  postYes: boolean= false;
  image:File;
  constructor(private  socialAuthService: AuthService, private  router: Router,public toast:ToastsManager, vcr: ViewContainerRef, private obj: App_service) {
    this.toast.setRootViewContainerRef(vcr);
  }
  public user: any= SocialUser;
  public userURL: any= LoginProviderClass;

  isLoggedIn: boolean= true;
  isStatus: boolean= false;

  ngOnInit() {
    if(this.postYes = this.isStatus= true){
      this.get_Linked_in_data();
    }
    this.checkStatus();
  }
  static connectlinkedin() {
    alert('opened');
    let x = screen.width / 2 - 700 / 2;
    let y = screen.height / 2 - 450 / 2;
    let strWindowFeatures = "location=yes,height=624,width=584,scrollbars=yes,status=yes,left=" + x + ",top=" + y;
    // let URL = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77a1j72f9bf5ld&redirect_uri="+Config.api+"/influencer/profile/connect-linkedin&state=49f98033f3b6a37ef2d42be0399349e46fe7b37skladkas9eed7e5cd&scope=r_basicprofile+r_emailaddress";
    let URL = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77a1j72f9bf5ld&redirect_uri=http://localhost:4200/profile/connect-linkedin&state=49f98033f3b6a37ef2d42be0399349e46fe7b37skladkas9eed7e5cd&scope=r_basicprofile+r_emailaddress";
    // let URL = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77a1j72f9bf5ld&redirect_uri=https://influencer.influexpai.com/connect-linkedin&state=49f98033f3b6a37ef2d42be0399349e46fe7b37skladkas9eed7e5cd&scope=r_basicprofile+r_emailaddress";

    let win = window.open(URL, "_blank", strWindowFeatures);
    if(win.status){
      alert(win.status);
      console.log('Window Status is...........', win.status);
    }
  }

  linkedInLogin(){
    this.socialAuthService.signIn(LinkedinLoginProvider.PROVIDER_ID).then((userData) => {
      // this.user= userData;
      this.isLoggedIn= false;
      this.userURL= userData;
      console.log('user url is', this.userURL);
      this.showSuccess();
    })
  }
  refresh(): void {
    window.location.reload();
  }

  showSuccess(){
    this.toast.success('Please Save your Profile!', 'Success!')

  }

  post_linkedIn(f: NgForm){

    let username = localStorage.getItem('username');
    console.log(username);

    this.obj.postLinkedInData(
      this.userURL.name,
      this.userURL.email,
      this.userURL.photoUrl,
      username
    ).subscribe(
      data => {

        this.postYes= true;
        this.isStatus= true;
        // Swal('Profile get Sucessfully', '', 'success');
        this.getSuccessfullyProfile();
        this.get_Linked_in_data();


      },
      error => {

        // Swal('Profile Not Get', error.toString(), 'error');
        console.log('error is ',error);
        alert(error.toString())

      });
  }

  getSuccessfullyProfile(){
    this.toast.success('Profile get Sucessfully!', 'Success!')

  }
  clicktoLogin(){
    this.toast.warning('Login to Connect Your Profile', 'Please Login')

  }

  get_Linked_in_data(){
    this.obj.getLinkedInData().subscribe(
      data => {

        this.response= data;
        this.getSuccessfullyProfile();
        },
      error => {

        this.clicktoLogin();

      });

  }

  checkStatus(){
    this.obj.linkedInData_Status().subscribe(
      data => {
        if(data['Status'] == true){

          this.isStatus = true;
        }
        else if(data['Status'] == false)
        {

          this.isStatus= false;

        }
      });
  }
}
