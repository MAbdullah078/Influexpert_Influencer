import {Component, OnInit, AfterViewInit, Inject, ViewContainerRef} from '@angular/core';
import { environment as env } from '../../environments/environment';
// declare var jquery:any; declare var $ :any;
// import * as $ from 'jquery/dist/jquery.min.js';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {Headers, Response, Http} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';

import {Config} from "../config";

import {Country} from './countries';
import {ToastsManager} from "ng2-toastr";
import {Subscription} from "rxjs/Subscription";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-post-signup',
  templateUrl: './post-signup.component.html',
  styleUrls: ['./post-signup.component.scss']
})
export class PostSignupComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  blog_title: string;
  blog_url: string;
  countries = Country.countries;
  currentUser:any;
  selected_category;
  step2Model = {};
  step2disable:boolean;
  step3disable:boolean;
  connected_social_medias = {};


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

  categoryFormControl = new FormControl('', [
    Validators.required]);
  rateFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(0|[1-9][0-9]*)$/)]);
  rateFormControl1 = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(0|[1-9][0-9]*)$/)]);
  rateFormControl2 = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(0|[1-9][0-9]*)$/)]);



  dobFormControl = new FormControl('', [
    Validators.required]);
  first_nameFormControl = new FormControl('', [
    Validators.required]);
  last_nameFormControl = new FormControl('', [
    Validators.required]);
  passwordFormControl = new FormControl('', [
    Validators.required]);
  cityFormControl = new FormControl('', [
    Validators.required]);
  stateFormControl = new FormControl('', [
    Validators.required]);
  private sub: any;






  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private http: Http,
              public toastr: ToastsManager, vcr: ViewContainerRef, private _nav:Router, private route: ActivatedRoute) {
    this.toastr.setRootViewContainerRef(vcr);

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("jeshany ishaka", this.currentUser);
  }

  favoriteSeason: string;
  genders = [
    {show:'Male',value:'male'},
    {show:'Female',value:'female'}

  ];
  // selected_choice = '-id';
  choices = [
    {code: 'Automotive', name: 'Automotive'},
    {code: 'Beauty', name: 'Beauty'},
    {code: 'Business Finance', name: 'Business Finance'},
    {code: 'Crafts', name: 'Crafts'},
    {code: 'Education', name: 'Education'},
    {code: 'Entertainment Sports', name: 'Entertainment Sports'},
    {code: 'Event Partyplanning', name: 'Event Partyplanning'},
    {code: 'Family Parenting', name: 'Family Parenting'},
    {code: 'Fashion', name: 'Fashion'},
    {code: 'Fitness And Health', name: 'Fitness and Health'},
    {code: 'Food And Recipes', name: 'Food And Recipes'},
    {code: 'Green Living And Environment', name: 'Green Living And Environment'},
    {code: 'Home And Garden, DIY', name: 'Home And Garden, DIY'},
    {code: 'Lifestyle Personal', name: 'Lifestyle Personal'},
    {code: 'Music', name: 'Music'},
    {code: 'News, Law And Politics', name: 'News, Law And Politics'},
    {code: 'Pets', name: 'Pets'},
    {code: 'Retail Shopping', name: 'Retail Shopping'},
    {code: 'Sports', name: 'Sports'},
    {code: 'Technology And Social Media', name: 'Technology And Social Media'},
    {code: 'Travel', name: 'Travel'},

    // {code: 'AL', name: 'Alabama'},
  ];



  checkSocialMedias() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + '/check_social_medias/', {headers: headers}
    )
      .subscribe(res => {

          this.connected_social_medias =  res.json();

        },
        error => {

        });
  }
  ngOnInit() {
    this.checkSocialMedias();
    this.sub = this.route.queryParams.subscribe(params => {
      console.log(params)
      let code = params['code'];
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));

      let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
      headers.append('Content-Type', 'application/json');
      this.http.post(Config.api + '/attach_instagram/', JSON.stringify({'code':code}), {headers: headers}
      )
        .subscribe(res => {
            let newObj = {linkedin:res.json(), ...currentUser};
            localStorage.setItem('currentUser', JSON.stringify(newObj));
            window.close();
          },
          error => {

          });
      console.log(code);
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });


  }

  post_onboarding_step1(blog_url, blog_title) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
    headers.append('Content-Type', 'application/json');
    this.http.post(Config.api + '/onboarding_step1/', {blog_url: blog_url, blog_title: blog_title}, {headers: headers}
    )
      .subscribe(res => {
          currentUser.current_info_step = res.json()['current_info_step'];
          this.currentUser = currentUser;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.toastr.success('Blog Added');

        },
        error => {

        });
  }
  // onLoginWithInstagram() {
  //   window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${env.INST_CLIENT_ID}&redirect_uri=${env.INST_REDIRECT_URI}&response_type=code`;
  // }
  post_onboarding_step2() {
    this.step2disable = true;
    let catList = [];
    catList.push(this.selected_category);
    this.step2Model['categories'] = catList;
    console.log(this.step2Model)
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
    headers.append('Content-Type', 'application/json');
    this.http.post(Config.api + '/onboarding_step2/', this.step2Model, {headers: headers}
    )
      .subscribe(res => {
          this.step2disable = false;
          currentUser.current_info_step = res.json()['current_info_step'];
          this.currentUser = currentUser;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.toastr.success('Successfully saved!');

        },
        error => {

        });
  }


  post_onboarding_step3() {


    this.step3disable = true;
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    this.http.post(Config.api + '/onboarding_step3/', this.currentUser, {headers: headers}
    )
      .subscribe(res => {
          // currentUser.current_info_step = res.json()['current_info_step'];
          this.currentUser = res.json();
          localStorage.setItem('currentUser', JSON.stringify(res.json()));
          this.toastr.success('Successfully saved!','Success');
          this.step3disable = false;
          this._nav.navigate(['']);
        },
        error => {

        });
  }

  showError() {
    if (this.currentUser.current_info_step === 1) {
      this.toastr.warning('Please add blog first');
    }
  }
  saveStep2() {
   if (!this.selected_category) {
      this.toastr.warning('Please select category');
    }
    else{
     this.post_onboarding_step2()
    }
  }
  saveStep3() {
    console.log(this.currentUser)
    if (!this.currentUser.country) {
      this.toastr.warning('Please select country');
    } else if(!this.currentUser.dob){
      this.toastr.warning('Please select date of birth');
    }else if(!this.currentUser.gender){
      this.toastr.warning('Please select gender');
    }else if(!this.currentUser.password){
      this.toastr.error('Please set password');
    }
    else{
      this.post_onboarding_step3();
    }
    // else{
    //   this.post_onboarding_step2()
    // }
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(AddBlogDialog, {
      width: '550px',
      data: {blog_title: this.blog_title, blog_url: this.blog_url}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      if (result) {
        this.post_onboarding_step1(result.blog_url, result.blog_title);
      }
      console.log(result);
    });
  }


}


const url_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

@Component({
  selector: 'add-blog-dialog',
  templateUrl: 'add-blog-dialog.html',
})
export class AddBlogDialog {

  urlFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(url_REGEX)]);

  tittleFormControl = new FormControl('', [
    Validators.required
    // Validators.pattern(url_REGEX)
  ]);


  constructor(public dialogRef: MatDialogRef<AddBlogDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
