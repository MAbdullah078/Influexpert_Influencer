import { Component, OnInit } from '@angular/core';
import {App_service} from '../app.service';
// import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm} from '@angular/forms';
// import {FileValidatorDirective} from './FileValidator.directive';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatStepper} from '@angular/material';
import {HttpService} from '../serv/http-service';
import { Headers,Response, Http } from '@angular/http';
import {Config} from '../config';
import {Observable} from 'rxjs/Observable';
// import {App_service} from '../app.service';
import Swal from "sweetalert2";
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-myshowcase',
  templateUrl: './myshowcase.component.html',
  styleUrls: ['./myshowcase.component.scss']
})
export class MyshowcaseComponent implements OnInit {
  username: string;
  userdata: any;
  userdata1: any;
  state: any;
  city: any;
  country;
  showcase:any =[];
  showshowcase: any;
  datashowcase :any =[]
  show_image;

  constructor(private app_Service: App_service,private _formBuilder: FormBuilder, private http: HttpClient ,
    private router: Router, private loader: HttpService) { }

  ngOnInit() {

this.mysc();
    this.app_Service.getUserData().subscribe((data) => {
      this.datashowcase = data.message;
    // console.log(this.datashowcase)
      this.userdata= data.message;
      this.show_image = data.show_image;
      this.userdata1 = data.User_data;
      this.city = this.datashowcase['city'];
      for (let citys of this.datashowcase){
        // console.log(citys.city)
      }
      // console.log(this.city)

      localStorage.setItem('email', this.userdata1['email']);
      localStorage.setItem('user_id', this.userdata[0]['user']);
  });
  }
  Showshowcase;
  mysc() {
    this.app_Service.myshowcase().subscribe(showcase => {
      // console.log(showcase)
      this.showcase = showcase.message;
      // for(let abc of this.showcase){
        // console.log(abc)
      // }
      this.showshowcase = showcase
    });
  }
deletemyshowcase(id){
    this.app_Service.deleteshowcase(id).subscribe(rfm =>{
      // console.log('delete')
      // alert('deleted')
      swal({
        type: 'success',
        title: 'Deleted sucessfully',
        showConfirmButton: true,
        width: '512px',
        timer: 2000
      });
      this.mysc()
    },
error=>{
  swal({
    type: 'error',
    title: 'Something went wrong',
    showConfirmButton: false,
    timer: 2500
  })
   

  }

    )};
}
