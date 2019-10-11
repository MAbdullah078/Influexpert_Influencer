import 'rxjs/add/operator/map';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router, RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {Config} from './config';
import {HttpService} from './serv/http-service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import swal from "sweetalert2";
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import { tap } from 'rxjs/operators/tap';



@Injectable()
export class App_service {
  private head: any;
  currentUser;
  InstaResponse: any={};
  CurrentUser: any;
  username: any
  current: any;
  constructor(private _nav: Router,
              private https: Http, private toast: ToastsManager, private Http: HttpService,private http: Http
    ,@Inject(PLATFORM_ID) private platformId: Object)
  {

  }

  showerror(){
    this.toast.error('Some Server Side Error')
  }
  register_user(username, name,first_name,last_name, email , password, country,address,
               relationship , education, phone, state, city, employment_status, gender ){
    return this.Http.post(Config.api + '/influencer_signup/',
      {
        'username': username ,
        'name': name,
        'first_name': first_name,
        'last_name': last_name,
        'email': email ,
        'password': password,
        'country': country,
        'address': address,
        'relationship': relationship,
        'education': education,
        'phone': phone,
        'state': state,
        'city': city,
        'employment_status': employment_status,
        'gender': gender,
        
      }).map((res:Response)=>{
      if (res.status==200){
        this.CurrentUser= res.json();
        localStorage.setItem('current_User', JSON.stringify(this.CurrentUser));
        // console.log(JSON.parse(localStorage.getItem('current_User')));
        this._nav.navigate(['/authentication/signin']);
     }
      else if(res.status=500){
        this.showerror();
      }

    })
  }
  onupload(image:File){
    // const fd= new FormData();
    const fd2= new FormData();
    fd2.append('input_file0',image);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username =  this.currentUser.username;
    fd2.append('username',this.username);

    return this.http.post(Config.api + '/showcase/Upload-Image',fd2 )
        .pipe(tap(res=>{
            return res;
        }))
}
  onUpload(image:File){
    // const fd= new FormData();
    const fd2= new FormData();
    fd2.append('input_file0',image);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username =  this.currentUser.username;
    fd2.append('username',this.username);

    return this.http.post(Config.api + '/influencerUploadImage/',fd2 )
        .pipe(tap(res=>{
            return res;
        }))
}
checkuser(check){
  return this.http.get(Config.api+ '/user_name_exist/'+check ).map((response: Response) => {
    return response.json();
});

    // return this.http.get(Config.api + '/user_name_exist/').map((response: Response) =>{ return response.json());

    // });
}
get_profile_pic(){
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if ( this.currentUser != null ){
  let username =  this.currentUser.username;

  return this.http.get(Config.api+ '/getinfluencerimage/' + username).map((response: Response) => {
      return response.json();
  });
}
}
  get_All_Blog(){
    return this.http.get(Config.api + '/getallblog/').map((response: Response) => response.json());

}


//   contact_Us(name, email, phone, message) {
//     return this.http.post('http://192.168.29.166:8000/contact-us/',
//     // http://192.168.29.166:8000/contact-us/
//         {
//             'name':name,
//             'email' :email,
//             'mobile_no': phone,
//             'message' :message

//         }).map((response: Response) => {
//             console.log(response)
//         });
// }


contact_Us(name, email, phone, message) {
  return this.http.post('http://192.168.29.166:8000/contact-us/',
  // http://192.168.29.166:8000/contact-us/
      {
          'name':name,
          'email' :email,
          'mobile_no': phone,
          'message' :message

      }).map((response: Response) => {
          console.log(response)
      });
}


          getUserData() {
            // let currentUser= localStorage.getItem('currentUser');
            // let username = localStorage.getItem('username');
            // let username = localStorage.getItem('currentUser');
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if ( this.currentUser != null ){
  let username =  this.currentUser.username;
            return this.Http.get(Config.api + '/influencer_profile_get_edit/' + username).map((response: Response) => response.json());
          }
        }

      login(username: string, password: string) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const headers = new Headers();
          headers.append('Content-Type', 'application/json');
          return this.Http.post(Config.api + '/influencer_login/',
            JSON.stringify({ username: username, password: password }), {headers: headers})
            .map((response: Response) => {
              let user = response.json();
              console.log('Response. JSON is .........',response.json());
              localStorage.setItem('currentUser', JSON.stringify(user));
              console.log('current user is...................',JSON.parse(localStorage.getItem('currentUser')));

            });
        }



  getCountiresData() {
    return this.Http.get('https://raw.githubusercontent.com/Holek/steam-friends-countries/master/data/steam_countries.json' ).map((response: Response) => response.json());
  }


  do_SubsCribe(){
    let user_email= localStorage.getItem('email');
    // console.log('Current_User Email is', user_email);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.Http.post(Config.api + '/subscribed/', { 'email': user_email })
      .map((response: Response) => {
        response.json();
      });
  }


  do_UnSubsCribe(){
    let user_email= localStorage.getItem('email');
    // console.log('Current_User Email is', user_email);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.Http.post(Config.api + '/un-subscribed/', { 'email': user_email })
      .map((response: Response) => {response.json()}
      );
  }

  post_review(user_id, review, rate){
    user_id= localStorage.getItem('user_id');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    return this.Http.post(Config.api+'/Influexp_Review_Post',{
      'user': user_id,
      'review': review,
      'rate': rate
    },{headers:headers}).map((res:Response)=>{
      res.json();
    })
  }

  opt_In_On(){
    let user_id = localStorage.getItem('user_id');
    let user_email= localStorage.getItem('email');

    console.log('Current_User id is', user_id);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.https.post(Config.api + '/opt-in-on/', { 'email': user_email })
      .map((response: Response) => {
        response.json();
      });
  }


  opt_In_Off(){
    let user_id = localStorage.getItem('user_id');
    // console.log('Current_User Email is', user_email);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.Http.post(Config.api + '/opt-in-off/', { 'user_id': user_id })
      .map((response: Response) => {
        response.json();
      });
  }



  Check_SubsCribe(){
    let user_email= localStorage.getItem('email');
    console.log('Current_User Email is', user_email);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.https.post(Config.api + '/subscribed-user/', { 'email': user_email })
      .map((response: Response) => {
        response.json();
      });
  }



  // mynotes(page) {
  //   let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.get(Config.api + 'notesgenie/usernotes/' + this.current.user_id +'?page=' +page, { headers: headers }).map((response: Response) => response.json());
  // }

  myshowcase(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    // let username = localStorage.getItem('username');
    return this.Http.get(Config.api+ '/showcase/showcase_list_user/',{headers: headers}).map((response: Response) => {
      return response.json();
    })



  }

    uploadShowCase(image1, catagory, title, description, urls, requirement1, requirement2) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
      headers.append('Content-Type', 'application/json');

      return this.Http.post(Config.api + '/showcase/add-showcase/', {
        'image1': image1,
        // 'catagory': catagory,
        'catagory_id': catagory,
        'title': title,
        'description': description,
        'urls': urls,
        'requirement1': requirement1,
        'requirement2': requirement2
      }, {headers: headers}).map((response: Response) => {
        response.json();
        console.log('response during map', response.json());
      });
    }

  static httpClientErrorHandler(errorResponse: HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
      swal('Client Side Error')
    }
    else {
      swal('Server side Error')
    }
    return new ErrorObservable('There is a problem with a service. we are notified & working on it')
  }

      // Connect LinkedIn API's

  postLinkedInData(name, email, image, username){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
   return this.Http.post(Config.api+ '/linkedin_profile_data_post', {
      'name': name,
      'email': email,
      'image': image,
      'user': username
    }, {headers: headers}).map((response: Response) => {
     response.json();
        let emailLnkedUser= response.json()[0]['email'];
     localStorage.setItem('linkedIn_User_Email', emailLnkedUser);
   });
  }
  getLinkedInData(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
   // let email =  localStorage.getItem('linkedIn_User_Email');
   let username = localStorage.getItem('username');
    console.log('LinkedIn Username is', username);
    return this.Http.get(Config.api+ '/linkedin_profile_data_get/' + username,{headers: headers}).map((response: Response) => {
      return response.json();
    })

  }
  deleteLinkedInData() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    let username =  localStorage.getItem('username');

    return this.Http.delete(Config.api+ '/linkedin_profile_data_delete/' + username,{headers: headers}).map((response: Response) => {
      return response.json();
    });
  }
  delete_FBData() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    let username =  localStorage.getItem('username');

    return this.Http.delete(Config.api+ '/Facebook_profile_data_delete/' + username,{headers: headers}).map((response: Response) => {
      return response.json();
    });
  }
  linkedInData_Status() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    // let email =  localStorage.getItem('linkedIn_User_Email');
    let username = localStorage.getItem('username');
    console.log('LinkedIn Username is', username);
    return this.Http.get(Config.api+ '/linkedin_profile_data_status/' + username,{headers: headers}).map((response: Response) => {
      return response.json();
    })
  }
  Youtube_Status() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    let username = localStorage.getItem('username');
    return this.Http.get(Config.api+ '/Youtube_profile_data_status/' + username,{headers: headers}).map((response: Response) => {
      return response.json();
    })
  }
  Facebook_Status() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    let username = localStorage.getItem('username');
    return this.Http.get(Config.api+ '/Facebook_profile_data_status/' + username,{headers: headers}).map((response: Response) => {
      return response.json();
    })
  }

  // Connect LinkedIn API's End


  // Connect Youtube API's Start

  postYouTubeData(name, email, image, username){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
   return this.Http.post(Config.api+ '/Youtube_profile_data_post', {
      'name': name,
      'email': email,
      'image': image,
     'user': username
    }, {headers: headers}).map((response: Response) => {
     response.json();
   });
  }
  getYouTubeData(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    let username = localStorage.getItem('username');

    return this.Http.get(Config.api+ '/Youtube_profile_data_get/' + username,{headers: headers}).map((response: Response) => {
      return response.json();
    });
  }
  deleteYouTubeData() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');

   let username =  localStorage.getItem('username');

    return this.Http.delete(Config.api+ '/Youtube_profile_data_delete/' + username,{headers: headers}).map((response: Response) => {
      return response.json();
    });
  }

  deleteFacebookData() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    let username =  localStorage.getItem('username');


    return this.Http.delete(Config.api+ '/Facebook_profile_data_delete/' + username,{headers: headers}).map((response: Response) => {
      return response.json();
    });
  }

  postYoutubeData(){


  }

  // Connect Youtube API's End


  // Connect Facebook API's Start

  postFBData(name, email, image, username){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    return this.Http.post(Config.api+ '/Facebook_profile_data_post', {
      'name': name,
      'email': email,
      'image': image,
      'user': username
    }, {headers: headers}).map((response: Response) => {
      response.json();
      // console.log('Email',localStorage.getItem('linkedIn_User_Email'));
    });
  }
  getFBData(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    let username =  localStorage.getItem('username');
    return this.Http.get(Config.api+ '/Facebook_profile_data_get/' + username,{headers: headers}).map((response: Response) => {
      return response.json();
    });
  }
  deleteFBData() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');

    let username =  localStorage.getItem('username');

    return this.Http.post(Config.api+ '/Facebook_profile_data_delete/' + username,{headers: headers}).map((response: Response) => {
      return response.json();
    });
  }

  // onUpload(image: File)
  // {
  //   const fd= new FormData();
  //   let id= localStorage.getItem('user_id');
  //   fd.append('path', image);
  //   let username =  localStorage.getItem('username');
  //   return this.Http.post(Config.api + '/profile/' + username, fd)
  //     .map(res=>{
  //       console.log('Responce is', res);
  //     })
  // }

  // get_profile_pic(){
  //   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   let username =  localStorage.getItem('username');
  //   return this.Http.get(Config.api+ '/profile_view/' + username).map((response: Response) => {
  //     return response.json();
  //   });
  // }

    forgot_password_code(email){
    return this.Http.post(Config.api+ '/forgetpasswordcode/',
      {'email': email}).map((response: Response) => {
      return response.json();
    });

    }
  checkcode(key, email) {
    // console.log('Key is ..........', key)
    // console.log('forget_email', localStorage.getItem('forget_email'));
    return this.Http.post(Config.api + '/verifysentpasswordCode/',
      {
        'email': email,
        'code': key
      })
      .map((response: Response) => {
        let Res= response.json();
        console.log('Response is', Res.status);
        if(Res.status ==false){
        swal('Code is Expired please Verify again', '', 'warning')
          this._nav.navigate(['/authentication/confirm'])
        }
      });
  }

}


