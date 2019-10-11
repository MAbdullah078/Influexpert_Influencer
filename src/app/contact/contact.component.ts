// import { Component, OnInit } from '@angular/core';
// import {HttpService} from '../services/http-service';
// import {AuthenticationService} from '../_services';
// import swal from 'sweetalert2'
// import {Router} from '@angular/router';

// @Component({
//   selector: 'app-contact',
//   templateUrl: './contact.component.html',
//   styleUrls: ['./contact.component.css'],
//   providers:[AuthenticationService]

// })
// export class ContactComponent implements OnInit {
//   resolved(captchaResponse: string) {
//     console.log(`Resolved captcha with response ${captchaResponse}:`);
//   }

//   constructor(private obj: AuthenticationService, private preloadersvc: HttpService) { }

//   ngOnInit() {
//   }

//   model: any= {};


//   onSubmit(){
//           this.obj.contact_Us(this.model.name, this.model.email, this.model.phone, this.model.message)
//               .subscribe(data =>{console.log('Sent')});
//           this.show();
//           this.clear();



//   }
//   show(){
//     swal.fire({
//         type: 'success',
//         title: 'Your Message has been sent'
//     })
//   }
//   clear(){
//     this.model.name= '',
//         this.model.email='',
//           this.model.phone='',
//             this.model.message=''
//   }
// }

// @Component({
//   selector: 'whatisinfluexpai',
//   templateUrl: 'what-is-influexpai.html',
// })
// export class WhatIsInfluexpaiComponent {

//   constructor() { }
//   ngOnInit() {
//   }
// }

// @Component({
//   selector: 'HowItWorks',
//   templateUrl: 'How-It-Works.html',
// })
// export class HowItWorksComponent {

//   constructor() { }
//   ngOnInit() {
//   }
// }
// @Component({
//   selector: 'terms',
//   templateUrl: 'terms.html',
// })
// export class TermsComponent {

//   constructor() { }
//   ngOnInit() {
//   }
// }

// @Component({
//   selector: 'privacy',
//   templateUrl: 'privacy.html',
// })
// export class PrivacyComponent {

//   constructor() { }
//   ngOnInit() {
//   }
// }

// @Component({
//   selector: 'Terms-and-conditions',
//   templateUrl: 'Terms-and-conditions.html',
// })
// export class TermsAndConditionsComponent {

//   constructor() { }
//   ngOnInit() {
//   }
// }

// @Component({
//   selector: 'privacy-and-policy',
//   templateUrl: 'privacy-and-policy.html',
// })
// export class PrivacyAndPolicyComponent {

//   constructor() { }
//   ngOnInit() {
//   }
// }

// @Component({
//   selector: 'blog',
//   templateUrl: 'blog.html',
//     providers: [AuthenticationService]
// })
// export class BlogComponent {

//     getBlogs:any;
//     // @Input() id: ;
//   constructor(private obj:AuthenticationService, private router: Router) { }
//   ngOnInit() {
//   this.getAllBlogs();
//   }

//         getAllBlogs(){
//                 this.obj.get_All_Blog().subscribe(data=>{
//                     this.getBlogs= data
//                 console.log(this.getBlogs);
//                 })
//         }
//     getcurrentBlog(page){
//         this.router.navigate(['blog1'], { queryParams: {Profile: JSON.stringify(page)}});

//     }
// }




import {Component, Input, OnInit} from '@angular/core';
// import {HttpService} from '../services/http-service';
// import {AuthenticationService} from '../_services';
import {HttpService} from 'app/serv/http-service';
import {App_service} from '../app.service';

import swal from 'sweetalert2'
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
    providers:[App_service]
})
export class ContactComponent implements OnInit {
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  constructor(private obj: App_service, private preloadersvc: HttpService) { }

  ngOnInit() {
    window.scroll(0,0);

  }

model: any= {};


    onSubmit(){
            this.obj.contact_Us(this.model.name, this.model.email, this.model.phone, this.model.message)
                .subscribe(data =>{console.log('Sent')});
            this.show();
            this.clear();



    }
    show(){
      swal({
          type: 'success',
          title: 'Your Message has been sent'
      })
    }
    clear(){
      this.model.name= '',
          this.model.email='',
            this.model.phone='',
              this.model.message=''
    }

}

@Component({
  selector: 'whatisinfluexpai',
  templateUrl: 'what-is-influexpai.html',
})
export class WhatIsInfluexpaiComponent {

  constructor() { }
  ngOnInit() {
    window.scroll(0,0);

  }
}

@Component({
  selector: 'terms',
  templateUrl: 'terms.html',
})
export class TermsComponent {

  constructor() { }
  ngOnInit() {
    window.scroll(0,0);

  }
}

@Component({
  selector: 'privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyComponent {

  constructor() { }
  ngOnInit() {
    window.scroll(0,0);

  }
}
@Component({
  selector: 'HowItWorks',
  templateUrl: 'How-It-Works.html',
})
export class HowItWorksComponent {

  constructor() { }
  ngOnInit() {
    window.scroll(0,0);

  }
}

@Component({
  selector: 'Terms-and-conditions',
  templateUrl: 'Terms-and-conditions.html',
})
export class TermsAndConditionsComponent {

  constructor() { }
  ngOnInit() {
    window.scroll(0,0);

  }
}

@Component({
  selector: 'privacy-and-policy',
  templateUrl: 'privacy-and-policy.html',
})
export class PrivacyAndPolicyComponent {

  constructor() { }
  ngOnInit() {
    window.scroll(0,0);

  }
}

@Component({
  selector: 'blog',
  templateUrl: 'blog.html',
    providers: [App_service]
})
export class BlogComponent {

    getBlogs:any;
    // @Input() id: ;
  constructor(private obj:App_service, private router: Router) { }
  ngOnInit() {
  this.getAllBlogs();
  }

        getAllBlogs(){
                this.obj.get_All_Blog().subscribe(data=>{
                    this.getBlogs= data
                console.log(this.getBlogs);
                })
        }
    getcurrentBlog(page){
        this.router.navigate(['blog1'], { queryParams: {Profile: JSON.stringify(page)}});

    }
}