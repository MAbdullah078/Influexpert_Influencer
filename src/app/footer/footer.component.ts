import { Component, OnInit, AfterViewInit } from '@angular/core';
import {App_service} from '../app.service';
// import {OnDestroy} from '@angular/core';
// import {Router} from '@angular/router';
// import {Headers, Response} from '@angular/http';
// import {HttpService} from '../services/http-service';
// import {PushNotificationsService} from 'angular2-notifications';
// import {Config} from '../../config';
// import {DataService} from '../_services';
// import swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private obj: App_service) { }
  ngOnInit() {
    // window.scroll(0,0);

  }
  scrollTop() {
    window.scrollTo(0, 0);
}

}
