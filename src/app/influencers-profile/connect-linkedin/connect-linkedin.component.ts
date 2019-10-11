import {Component, OnDestroy, OnInit} from '@angular/core';
import {Http,Response,Headers} from "@angular/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Config} from "../../config";

@Component({
  selector: 'app-connect-linkedin',
  templateUrl: './connect-linkedin.component.html',
  styleUrls: ['./connect-linkedin.component.scss']
})
export class ConnectLinkedinComponent implements OnInit,  OnDestroy {
  sub: any;
  constructor( private http: Http, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {

    this.sub = this.route.queryParams.subscribe(params => {

      let code = params['code'];

      // };
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));

      let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
      headers.append('Content-Type', 'application/json');
      this.http.post(Config.api + '/attach_linked_in/', JSON.stringify({'code':code}), {headers: headers}

      )
        .subscribe(res => {
            let newObj = {linkedin:res.json(), ...currentUser};
            localStorage.setItem('currentUser', JSON.stringify(newObj));
            window.close();
          },
          error => {

          });
      console.log(code);
    })
  }
  ngOnDestroy() {
    // localStorage.removeItem('navigated_list');
    this.sub.unsubscribe();

  }
}
