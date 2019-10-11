import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
declare const Buffer;


@Component({
  selector: 'app-connect-twitter',
  templateUrl: './connect-twitter.component.html',
  styleUrls: ['./connect-twitter.component.scss']
})
export class ConnectTwitterComponent implements OnInit {


  consumerkey: any = 'FjRW5PnI1hE2TvpYuGSxEeGKY';
  consumersecret: any = 'hDBBlbxN3Ua8w4NQ2cbddy1pD3YULnEyas3jVWMXhxMLM3H7ir';
  bearertoken: any = '';



  constructor(private http: Http) { }

  ngOnInit() {
  }

  getTwAccessToken() {
    console.log("hello");
    let header = this.consumerkey + ':' + this.consumersecret;
    let encheader = new Buffer(header).toString('base64');
    let finalheader = 'Basic ' + encheader;

    this.http.post('https://api.twitter.com/oauth2/token', {
      form: {'grant_type': 'client_credentials'},
      headers: {Authorization: finalheader}
    }).map((response : Response) => {
      // login successful if there's a jwt token in the response
      console.log(response + 'oyyy');
      this.bearertoken = response.json().access_token;
      if (this.bearertoken) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(this.bearertoken);
      }
    });
  }
}
