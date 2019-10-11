import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connect-blogger',
  templateUrl: './connect-blogger.component.html',
  styleUrls: ['./connect-blogger.component.scss']
})
export class ConnectBloggerComponent implements OnInit {
  isLoggedIn: boolean= true;

  constructor() { }

  ngOnInit() {
  }

}
