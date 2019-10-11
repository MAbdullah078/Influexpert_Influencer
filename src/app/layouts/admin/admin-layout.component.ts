import { Component, OnInit, OnDestroy, ViewChild, HostListener, AnimationTransitionEvent } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { MenuItems } from '../../shared/menu-items/menu-items';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { TranslateService } from '@ngx-translate/core';
import {App_service} from '../../app.service';
import swal from 'sweetalert2';
import {Config} from '../../config';
import {Http, Response} from '@angular/http';
// import { Router, RouterModule, NavigationEnd } from '@angular/router';


export interface Options {
  heading?: string;
  removeFooter?: boolean;
  mapHeader?: boolean;
}

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
currentUser;
  private _router: Subscription;
    model: any=[];
    userid;
    rate;
    review;
  currentLang = 'en';
  options: Options;
  theme = 'light';
  showSettings = false;
  isDocked = false;
  isBoxed = false;
  isOpened = true;
  profile_image: any;
  mode = 'push';
  apiURL: string ='https://storage.influexpai.com/Influencer_profile_picture/';
  imageAddress: string;
  _mode = this.mode;
  _autoCollapseWidth = 991;
  width = window.innerWidth;

  @ViewChild('sidebar') sidebar;
   ratingValue: any;
  private image: File;
  imageName: any;

  constructor (
    public menuItems: MenuItems,
    private router: Router,
    private obj:App_service,
    private route: ActivatedRoute,
    private http: Http,
    public translate: TranslateService,
    private modalService: NgbModal,
    private titleService: Title,
    private _nav: Router) {

      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        // console.log("okokokokokookokookokokokokokok",this.currentUser);
  }

  ngOnInit(): void {
    this.loadprofilepic();

    if (this.isOver()) {
      this._mode = 'over';
      this.isOpened = false;
    }

    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      // Scroll to top on view load
      document.querySelector('.main-content').scrollTop = 0;

      if (this.isOver() || event.url === '/maps/fullscreen') {
        this.isOpened = false;
      }

      this.route.children.forEach((route: ActivatedRoute) => {
        let activeRoute: ActivatedRoute = route;
        while (activeRoute.firstChild) {
          activeRoute = activeRoute.firstChild;
        }
        this.options = activeRoute.snapshot.data;
      });

      if (this.options.hasOwnProperty('heading')) {
        this.setTitle(this.options.heading);
      }
    });
  }


signout()
{

  localStorage.clear();
    this._nav.navigate(['/authentication/signin']);
    this.logoutsweetalert();

}
logoutsweetalert() {

  swal({
    title: "influexpai<br> Thanks for visiting us",
    type: "success",
    showConfirmButton: false,
    timer: 2000,
  })
  // this.showlink = false;
}


  ngOnDestroy() {
    this._router.unsubscribe();
  }

  setTitle( newTitle: string) {
    this.titleService.setTitle( 'InfluExp - Influencer| ' + newTitle );
  }

  toogleSidebar(): void {
    if (this._mode !== 'dock') {
      this.isOpened = !this.isOpened;
    }
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 991px)`).matches;
  }

  openSearch(search) {
    this.modalService.open(search, { windowClass: 'search', backdrop: false });
  }

  addMenuItem(): void {
    this.menuItems.add({
      state: 'menu',
      name: 'MENU',
      type: 'sub',
      icon: 'basic-webpage-txt',
      children: [
        {state: 'menu', name: 'MENU'},
        {state: 'menu', name: 'MENU'}
      ]
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.width === event.target.innerWidth) { return false; }
    if (this.isOver()) {
      this._mode = 'over';
      this.isOpened = false;
    } else {
      this._mode = this.mode;
      this.isOpened = true;
    }
    this.width = event.target.innerWidth;
  }

  onclick(value){
    this.ratingValue = value;
  }
  reviewSubmit(){
   this.userid= localStorage.getItem('user_id');
      this.obj.post_review(this.model.userid, this.model.review, this.ratingValue).subscribe(
        data=>{
          this.rate= this.ratingValue;

          swal('Thanks for rating  ', this.rate.toString() + ' Star Review' , 'success' )
      })
  }


  processProfileImage() {

    swal({
      title: 'Select profile image!',
      text: 'New profile image will be uploaded',
      type: 'question',
      //html:'',
      input: 'file',
      inputClass: 'form-control',
      preConfirm: (result) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {

            if (result == null) {
              reject('Please select an image')

            }
            else {
              if (result.type.match('image.*')) {
                console.log("is an image");
                resolve();
              }
              else {
                reject('Please select an image')
              }
            }
          }, 2)
        })
      },
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      // console.log(result);
      //
      this.getBase64(result)
      ;

      // }

    }, function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          '',
          'error'
        )
      }
    })

  }


  getBase64(file) {

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // console.log(reader.result);
      this.uploadProfileImage(reader.result)


    };
    reader.onerror = (error) => {

    };

  }

  uploadProfileImage(img) {

    // let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    let myhttp

    myhttp.post('https://apis.influexpai/upload_brand_profile_image/', {profile_image: img},
      {headers: headers}).map((response: Response) => response.json()).subscribe(
      data => {
        // this.currentUser['profile_image'] = Config.api+'/media/'+data['profile_image'];


        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        // this.comp.loadCurrentUser(Config.api+'/media/'+data['profile_image']);
        // this.data.changeUserData(this.currentUser);
        swal(
          'Image Saved!',
          '',
          'success'
        )

      },
      error => {

        swal(
          'Try again after some time!',
          error.toString(),
          'error'
        )

      });
  }

  onChange($event) {
    this.image= $event.target.files[0];
    console.log('Image Event...' , this.image);



    this.obj.onUpload(this.image).subscribe((response) => {
      // console.log('set any success actions...');
      this.loadprofilepic();
    },
    (error) => {
      console.log('set any error actions...');
    })
  }
    loadprofilepic(){
     
      this.obj.get_profile_pic().subscribe(observer=>{

        // this.profile_image= observer.Message.path;
        this.profile_image= observer['message'];
    
        console.log('Result is ', this.profile_image);
    })
}

}
