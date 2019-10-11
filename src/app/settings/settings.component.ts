import { Component, OnInit } from '@angular/core';
import {App_service} from '../app.service';
import {Headers, Http, Response} from '@angular/http';
import {HttpService} from '../serv/http-service';
import {Config} from '../config';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [App_service]
})
export class SettingsComponent implements OnInit {

  switch = false;
  user_id;
  opt_In= false;

  public model;


  constructor(private  srvc_obj: App_service, private https: Http, private Http:HttpService) {
  }

  ngOnInit() {

    this.checkOpt_In();

    const user_email= localStorage.getItem('email');
    // console.log('Current_User Email is', user_email);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.https.post(Config.api + '/subscribed-user/', { 'email': user_email })
      .map((response: Response) => {
        response.json();
        console.log('SUBSCRIBED USER', response.json());

        if(response.status==202){
          this.switch= true;
        }
        else if(response.status==500) {
          this.switch= false;
        }
      }).subscribe(data => {});



  }

  checkOpt_In(){
    const email= localStorage.getItem('email');
      // console.log('user id', user_Id);
   return this.Http.post(Config.api + '/opt-in-user/', { 'email': email })
      .map((response: Response) => {
        response.json();
        console.log('OPT_IN  USER', response.json());

        if(response.status==202){
          this.opt_In= true;
                         }
              else if(response.status==400) {
                this.opt_In= false;
              }
            }).subscribe(data => {});
}


  Subscribe() {

    if (this.switch) {

      this.srvc_obj.do_SubsCribe().subscribe(

        data => {
          // alert('Subscribe ....');
          Swal('You are Subscribed Successfully', '', 'success');


        });
    }
    else
      if(this.switch=true){

      this.srvc_obj.do_UnSubsCribe().subscribe(data => {
        console.log('data is', data);
        Swal('You are now Unsubscribed', '', 'success');


      });
    }

  }

  OPT_IN() {

    if (this.opt_In) {

      this.srvc_obj.opt_In_On().subscribe(

        data => {
          // alert('Subscribe ....');
          Swal('Added to Opt-In Successfully', '', 'success');


        });
    }
    else
    if(this.opt_In=true){

      this.srvc_obj.opt_In_Off().subscribe(data => {
        // console.log('data is', data);
        Swal('Removed from Opt-In Successfully', '', 'success');


      });
    }

  }





}
