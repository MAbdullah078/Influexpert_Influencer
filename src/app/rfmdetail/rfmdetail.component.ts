import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { App_service } from 'app/app.service';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from '../config';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-rfmdetail',
  templateUrl: './rfmdetail.component.html',
  styleUrls: ['./rfmdetail.component.scss']
})
export class RfmdetailComponent implements OnInit {


  registerUser = this.fb.group({


    price:['', [Validators.required]],
    description: ['', Validators.required],
  })





  constructor(private route: ActivatedRoute,public serv :App_service,private fb: FormBuilder,private http: HttpClient


    ) { }
sub;
Catid;
rfmss:any=[]
  ngOnInit() {

    this.sub = this.route.queryParams
    .subscribe(params => {   
      this.Catid = params['rid'] || '0';}
      )
      this.view(this.Catid)
    }


  view(Catid)
  {
  console.log(this.Catid)
  this.serv.rfms(this.Catid).subscribe((data) => {
    this.rfmss= data.msg;
    console.log(this.rfmss)
  
  })
  }
  goToLink(url) {
    //let url = 'https://twitter.com/' + influencer.screen_name.replace("('", '').replace("',)", '');
    Swal({
        title: 'You&#39;re Leaving This Site!',
        text: 'This is a link to an external site. Click OK to continue to the content',
        // html: true,
        confirmButtonColor: '#2ecc71',
        // showCancelButton: true,

    }).then(() => {

        window.open(url);


    }, (dismiss) => {
        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        if (dismiss === 'cancel') {
            // localStorage.removeItem('selected_list_twitter');

            Swal(
                'Cancelled',
                '',
                'success'
            )
        }
    });
}
submit(){
  console.log( this.registerUser.controls['price'].value,)


  this.serv.biding(this.registerUser.controls['price'].value,this.registerUser.controls['description'].value,this.Catid ).subscribe(Res => {
    Swal({
      text: 'Please check your email for account activation instructions',
      title: "CramFrenzy",
      type: "success",
      showConfirmButton: false,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "OK",
      width: '512px',
      timer: 2500
    });
  });










}

}
