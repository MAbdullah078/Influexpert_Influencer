import { Component, OnInit } from '@angular/core';
import {App_service} from '../app.service';


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

  constructor(private app_Service: App_service) { }

  ngOnInit() {
    // this.username= localStorage.getItem('username');

this.mysc();
    this.app_Service.getUserData().subscribe((data) => {
      this.datashowcase = data.message;
    console.log(this.datashowcase)
      this.userdata= data.message;
      this.show_image = data.show_image;
      this.userdata1 = data.User_data;
      this.city = this.datashowcase['city'];
      for (let citys of this.datashowcase){
        console.log(citys.city)
      }
      console.log(this.city)

      localStorage.setItem('email', this.userdata1['email']);
      localStorage.setItem('user_id', this.userdata[0]['user']);
      // localStorage.setItem('city', this.city[0]['city']);

  });
  }
  Showshowcase;
  mysc() {
    this.app_Service.myshowcase().subscribe(showcase => {
      console.log(showcase)
      this.showcase = showcase.message;
      for(let abc of this.showcase){
        console.log(abc)
      }
      this.showshowcase = showcase
    });
  }


}
