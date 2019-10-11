import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import {Http} from '@angular/http';
import {FacebookService, InitParams} from 'ngx-facebook';
import {ToastsManager} from 'ng2-toastr';
import {App_service} from '../../app.service';
import {Config} from '../../config';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const NAME_REGEX = /^[a-zA-Z _.]+$/;
const PHONE_REGEX = /^[0-9]+$/;

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  hour ;
  _second;
  showTimerr: boolean;
  showExpString: string;
  showResendButton: boolean;
  code: '';
  email;
  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private http: App_service) {}

  ngOnInit() {

    this.email= localStorage.getItem('forget_email');
    this.form = this.fb.group ( {
      uname: [null , Validators.compose ( [ Validators.required ] )]
    } );

    this.Timerr(4, 59);
    console.log('Time is', )

  }

  onSubmit() {
  }

  Timerr(hour, _second) {
    this.hour = hour;
    this._second = _second;
    var clear = setInterval(() => {
      this._second = _second--;
      if (_second == 0) {
        if (hour == 0) {
          this.showExpString = "Your is Code Expired"
          clearInterval(clear);
          this.showTimerr = false;
          this.showResendButton = true;
        }
        else {
          this._second = _second = 59;
          this.hour = hour--;
          console.log('Seconds are.....', this._second);
          console.log('Hours are.....', this.hour);
        }
      }
    }, 1000);
  }

  // This Line use in ngOnInit()
submitCode(){
  console.log('Email is...', this.email);
  this.http.checkcode(this.code, this.email).subscribe(data=>{
    console.log(data);
    this.router.navigate ( [ '/authentication/new-password' ] );

  })

}
}
