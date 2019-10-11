import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-new-password',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      uname: [null , Validators.compose ( [ Validators.required ] )]
    } );

    this.form = this.fb.group ( {
      newpass: [null , Validators.compose ( [ Validators.required ] )]
    } );
  }

  onSubmit() {
    swal('OK', '', 'success')
  }
}
