import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {App_service} from '../../app.service';
import Swal from "sweetalert2";
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  providers:[App_service]
})
export class ForgotComponent implements OnInit {

  public form: FormGroup;
  // model: [];
  email;
  constructor(private fb: FormBuilder, private router: Router, private obj: App_service) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      uname: [null , Validators.compose ( [ Validators.required, Validators.pattern(EMAIL_REGEX) ] )]
    } );
  }

  onSubmit(){

   this.obj.forgot_password_code(this.email).subscribe(
     data => {
    localStorage.setItem('forget_email', this.email);
       Swal('Please Check your Email and Write the Verification Code', '', 'success');
       this.router.navigate( [ '/authentication/confirm' ]);

     },
     error => {

       Swal('error is ',error.toString());
       // alert(error.toString());

     }
   )
  }

}
