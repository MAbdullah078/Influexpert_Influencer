import { Component, OnInit, AfterViewInit } from '@angular/core';
import {App_service} from '../app.service';
// import {OnDestroy} from '@angular/core';
// import {Router} from '@angular/router';
import {Headers, Response} from '@angular/http';
// import {HttpService} from '../services/http-service';
// import {PushNotificationsService} from 'angular2-notifications';
import {Config} from '../config';
// import {DataService} from '../_services';
import swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm} from '@angular/forms';
import { Http} from '@angular/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // public form: FormGroup;/*  */
  email = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  registerUser:FormGroup
  Email =  new FormControl([
    Validators.pattern(this.email),
    Validators.required
  ])
  constructor(private obj: App_service ,private fb:FormBuilder,private http: Http) { }
  ngOnInit() {
    // window.scroll(0,0);
    this.registerUser = this.fb.group({

      Email: ['',Validators.compose([ Validators.required, Validators.pattern(this.email)])],
  
    });
  }
  scrollTop() {
    window.scrollTo(0, 0);
}
sub() {
  this.http.post(Config.api+'/newsletteremail/', {
    email: this.registerUser.controls['Email'].value
   }).subscribe((response: Response) => {
               if(response.status==202){
              swal('You will get alerts from our Newsletter')

          }
   });
  }

}
