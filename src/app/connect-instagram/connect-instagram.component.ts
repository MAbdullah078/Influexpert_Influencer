import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {App_service} from '../app.service';
import {getResponseURL} from '@angular/http/src/http_utils';
import swal from 'sweetalert2';
import {Response} from '@angular/http';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-connect-instagram',
  templateUrl: './connect-instagram.component.html',
  styleUrls: ['./connect-instagram.component.scss'],
  providers:[App_service]
})
export class ConnectInstagramComponent implements OnInit {

  instaData: any= {}
  private InstaResponse: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private obj: App_service,
    private http: HttpClient
  ) { }
  clientid : string= '9687c7ba4b4d46bf8b5a9c21aec91fc3';

  ngOnInit() {
    // const  QueryParams= this.route.snapshot.queryParams;

    this.route
      .queryParams
      .subscribe(params => {
        console.log('params: ' + JSON.stringify(params));
        let at = params['#access_token'];
        console.log('access_token: ' + at);
      });
    // this.getData();

  }

  signInWithInsta(): void {
    let url =
      'https://api.instagram.com/oauth/authorize/?client_id=' + this.clientid +
      '&redirect_uri=' + encodeURIComponent('http://localhost:3000/connect-instagram') +
      '&response_type=token';
    // console.log('Responce is.........', getResponseURL('token'));
    // console.log('Respose is.............. ', url);

    // window.location.href = url;
    this.getData();
  }

// getData(){
//     this.obj.get_instadata().subscribe((observer)=>{
//       console.log('Observer is', observer);
//     });
//   this.instaData= localStorage.getItem('InstaData');
//   console.log('Current Instagram User is.....', this.instaData);
//
// }

  getData(){
    return this.http.get('https://api.instagram.com/v1/users/self/media/recent/?access_token=1117963920.9687c7b.86018ee191224e708e146d4d56a7a4cc')
      .map((res:Response) => {
        console.log('Response is ', res['data']);
        this.InstaResponse= res;
        console.log('InstaData is', this.InstaResponse.data[0]['user']);

      }).subscribe(data=>{

        console.log('data is....', data)
      })
  }

}
