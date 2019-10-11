import { Component, OnInit } from '@angular/core';
import {App_service} from '../app.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  providers: [App_service]
})
export class ManageComponent implements OnInit {

  isStatusLD:boolean= false;
  isYTStatus:boolean= false;
  isFBStatus:boolean= false;
  private response: any;
  private responseYt: any;

  constructor(private obj: App_service) { }

  ngOnInit() {
  this.checkStatusLD();
  this.checkStatusYT();
  this.checkStatusFB();
  }


  checkStatusLD(){
    this.obj.linkedInData_Status().subscribe(
      data => {

        if(data['Status'] == true){
          this.isStatusLD = true;
        }
        else if(data['Status'] == false)
        {

          this.isStatusLD= false;
        }
      });
  }
  checkStatusYT(){
    this.obj.Youtube_Status().subscribe(
      data => {

        if(data['Status'] == true){
          this.isYTStatus = true;
        }
        else if(data['Status'] == false)
        {

          this.isYTStatus= false;


        }
      });
  }

  checkStatusFB(){
    this.obj.Facebook_Status().subscribe(
      data => {

        if(data['Status'] == true){
          this.isFBStatus = true;
          console.log('in True', data);
        }
        else if(data['Status'] == false)
        {

          this.isFBStatus= false;
          console.log('in False', data);


        }
      });
  }


  delete_Linked_in_data(){
    this.obj.deleteLinkedInData().subscribe(
      data => {
        this.response= data;
        Swal('Profile delete Sucessfully', '', 'success');
        this.checkStatusLD();

      },
      error => {
        console.log('error is ',error);
      });

  }

  delete_FB_data(){
    this.obj.delete_FBData().subscribe(
      data => {
        this.response= data;
        Swal('Profile delete Sucessfully', '', 'success');
        this.checkStatusFB();

      },
      error => {
        console.log('error is ',error);
      });

  }

  sureDeletedLD(){
    Swal({
      title: 'Are You Sure you want to delete your Profile..?',
      type: 'question',
      confirmButtonText:'Delete',
      preConfirm: (result) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.delete_Linked_in_data();
          }, 2)
        })
      },
      showCancelButton: true

    })
  }

  sureDeletedFB(){
    Swal({
      title: 'Are You Sure you want to delete your Profile..?',
      type: 'question',
      confirmButtonText:'Delete',
      preConfirm: (result) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.delete_FB_data();
          }, 2)
        })
      },
      showCancelButton: true

    })
  }



  delete_Yt_in_data(){
    this.obj.deleteYouTubeData().subscribe(
      data => {
        // console.log('data in get API ........', data);
        this.responseYt= data;

        Swal('Profile delete Sucessfully', '', 'success');
      },
      error => {
        Swal('Profile Not Get', error.toString(), 'error');
      });
  }

  sureDeletedYT(){
    Swal({
      title: 'Are You Sure you want to delete your Profile..?',
      type: 'question',
      confirmButtonText:'Delete',
      preConfirm: (result) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.delete_Yt_in_data();
          }, 2)
        })
      },
      showCancelButton: true

    })
  }
}
