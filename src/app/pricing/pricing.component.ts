import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers, Response} from '@angular/http';
// import {HttpService} from '../services/http-service';
import 'rxjs/add/operator/map';
import {Config} from '../config';
import { HttpService } from 'app/serv/http-service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  email = '';
  emailchk = false;
  loading = false;
  exists = false;
  model;
  isModal = false;
  isright = false;
  constructor(private router: Router, private http: Http, private preloadersvc: HttpService) {
  }

  ngOnInit() {
    window.scroll(0,0);

  }

  getStarted() {

    this.loading = true;
    this.proceedstep1();


  }

  closeModal() {
    this.isModal = false;
  }



  pricingpackage(value) {
    this.isModal = true;
    localStorage.setItem('package', value);
    console.log(value);
  }

  check(valid) {
    this.exists = false;
    console.log(valid)
    this.emailchk = valid;
    if (valid) {
      this.chkmail();
    }
  }


  uniquemail() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + '/validate/email/',
      JSON.stringify({
        email: this.email
      }), {headers: headers})
      .map((response: Response) => {
        console.log(response);
      });
  }


  sendmail() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.preloadersvc.post(Config.api + '/confirm/email/',
      JSON.stringify({
        email: this.email
      }), {headers: headers})
      .map((response: Response) => {
        console.log(response);
      });
  }

  proceedstep1() {
    // this.isModal = false;
    this.sendmail()
      .subscribe(
        data => {
            this.isModal = false;
          localStorage.setItem('brandemail', this.email)
          // this.router.navigate([this.returnUrl]);
          this.router.navigate(['pricing/steps']);
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;

          alert('Server is down please try again after some time.');
        });
  }

  chkmail() {
    this.loading = true;
    this.uniquemail()
      .subscribe(
        data => {
          // this.router.navigate([this.returnUrl]);
          this.loading = false;
        },
        error => {
          this.emailchk = false;
          // this.alertService.error(error);
          this.loading = false;
          this.exists = true;
          // alert(error)
        });
  }

}
