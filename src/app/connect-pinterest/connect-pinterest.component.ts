import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Response} from '@angular/http';

@Component({
  selector: 'app-connect-pinterest',
  templateUrl: './connect-pinterest.component.html',
  styleUrls: ['./connect-pinterest.component.scss']
})
export class ConnectPinterestComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  post_Pinterest(){
    console.log('PInterest Click ');
    return this.http.get('https://api.pinterest.com/v1/boards/?access_token=AkAs84TfbgiAvbExvQb2OayzDVwFFXA2J5jLxiBFdy1pqMBqvwnkwDAAAeNzRXctyUwgVyoAAAAA')
      .map((response: Response) => {
      response.json();
    })
  }
}
