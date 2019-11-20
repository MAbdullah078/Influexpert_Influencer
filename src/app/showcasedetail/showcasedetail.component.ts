import { Component, OnInit } from '@angular/core';
import {App_service} from '../app.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-showcasedetail',
  templateUrl: './showcasedetail.component.html',
  styleUrls: ['./showcasedetail.component.scss']
})
export class ShowcasedetailComponent implements OnInit {
  showcase: any;
  showshowcase: any;
  users: any;
  sub: any;
  requirement: any;
  image: any;
  input: FormData;
  base64textString: string;
  url: any;

  constructor(private app_Service: App_service, private fb: FormBuilder,private route: ActivatedRoute) { }


  Catid:any=[];

  ngOnInit() {

    window.scroll(0,0)

    this.users = this.fb.group({
      "title":[''],
      "cat":[''],
      "des":[''],
      "req1": [''],
      "url": [''],
      "stat":['']
    });
  
   
    this.sub = this.route.queryParams
.subscribe(params => {   
  this.Catid = params['rid'] || '0';}
  )
  // alert(this.Catid)
  this.mycreatedshowcase()


  // console.log(this.mycreatedshowcase)
  }

  mycreatedshowcase(){
    this.app_Service.showmyshowcase(this.Catid).subscribe(res => {
      // console.log(res)
      this.showcase = res.Showcase;
      this.requirement = res.ShowcaseRequiirement;
      this.image = res.ShowcaseImage2;
      for(let abc of this.showcase){
        // console.log(abc)
        // console.log(this.showcase)
      }
      for(let abc of this.requirement){
        // console.log(this.requirement)
      }
      this.showshowcase = res
    });
  }

  updateshowcase(title ,url,cat,des,ck){
      // console.log(title ,url,cat,des)
        // alert('sadas')
        console.log(ck)
    this.app_Service.editshowcase(this.Catid, title ,url,cat,des).subscribe(data=> {
  
    })
  }

  updaterequirement(req1){
    // console.log(req1)

    this.app_Service.editrequirement(this.Catid,req1).subscribe(data=> {
    })
  }
}
