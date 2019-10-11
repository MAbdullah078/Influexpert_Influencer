import {Component, ElementRef, OnInit, ViewContainerRef} from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from 'ng4-social-login';
import {NgForm} from '@angular/forms';
import Swal from "sweetalert2";
import {App_service} from '../app.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-connect-youtube',
  templateUrl: './connect-youtube.component.html',
  styleUrls: ['./connect-youtube.component.scss'],
  providers:[AuthService]
})
export class ConnectYoutubeComponent implements OnInit {

  constructor(private socialAuthService: AuthService,  public toast:ToastsManager, vcr: ViewContainerRef, private obj:App_service,
  private  el: ElementRef) {
    this.toast.setRootViewContainerRef(vcr);
  }
  public user: any= SocialUser;
  isLoggedIn: boolean= true;
  model: any= [];
  name;
  response: any;
  email;
  postYes: boolean= false;
  isStatusYT: boolean= false;
  image:File;


  ngOnInit() {

    if(this.postYes = this.isStatusYT= true ){
      this.get_youtube_in_data();
    }

    this.checkStatus();
  }

  linkedGoogle(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user= userData;
      this.isLoggedIn= false;
      this.showSuccess();
    })
  }


  showSuccess(){
    this.toast.success('Please Save your Profile!', 'Success!')

  }

  post_Youtube(f: NgForm){

    let username = localStorage.getItem('username');
    this.obj.postYouTubeData(
      this.user.name,
      this.user.email,
      this.user.photoUrl,
      username

    ).subscribe(
      data => {
        this.postYes= true;


      },
      error => {

        console.log(error)
      });
  }
  get_youtube_in_data(){
    this.obj.getYouTubeData().subscribe(
      data => {

        this.response= data;
      },
      error => {


      });

  }

  checkStatus(){
    this.obj.Youtube_Status().subscribe(
      data => {

        if(data['Status'] == true){

          this.isStatusYT = true;

        }

        else if(data['Status'] == false)
        {

          this.isStatusYT= false;

        }
      });
  }




}
