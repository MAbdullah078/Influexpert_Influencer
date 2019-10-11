import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm} from '@angular/forms';
import {FileValidatorDirective} from './FileValidator.directive';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatStepper} from '@angular/material';
import {HttpService} from '../serv/http-service';
import { Headers,Response, Http } from '@angular/http';
import {Config} from '../config';
import {Observable} from 'rxjs/Observable';
import {App_service} from '../app.service';
import Swal from "sweetalert2";
import swal from 'sweetalert2';
import {Router} from '@angular/router';


@Component({
  selector: 'app-createshowcase',
  templateUrl: './create-showcase.component.html',
  styleUrls: ['./create-showcase.component.scss']
})
export class CreateShowcaseComponent implements OnInit  {

  StepNo = '1';
  @ViewChild('stepper') stepper: MatStepper;
  private input_images: any=[];
  private input: any;
  base64textString: any = [];
  model: any= [ ];
  imgOverLay = '';
  isLinear = true;
  ImgSrc: any = [];
  files: any;
  options: any=[];
  filteredOptions: Observable<string[]>;
  stFpage: FormGroup;

  description = new FormControl('', [
    Validators.required,
  ]);
  firstFormGroup: FormGroup;
  secondFormGroup: any;
  thirdFromGroup: any;
   fileList: any=[];
  myControl: FormControl = new FormControl();
  private currentUser: any;
  fourthFromGroup: FormGroup;
   catID: any;
   varImg: any =[];
   apiURL: string ='https://storage.influexpai.com/Showcase/image/';
  imageAddress: string;
  image: File;
  imageName: string;
  catagory;
  title;
  public urls;
  requirement1;
  requirement2;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient ,
               private router: Router, private loader: HttpService, private app_Service: App_service) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required]
    });

    this.thirdFromGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required],
    });

    this.fourthFromGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required],
      sixthCtrl: ['', Validators.required],
    });


    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    // headers.append('Content-Type', 'application/json');

    this.http.get(Config.api + '/ml/categories-list/')
      .subscribe(res => {

        this.options = res;
        // console.log(res.json());
      });

    this.stFpage= new FormGroup({
      // add_images: new FormControl("", [FileValidatorDirective.validate]),
      file: new FormControl("", [FileValidatorDirective.validate])

    });

  }




  FuncCheckIfImageUploaded() {
    if (this.fileList.length >= 1) {
      return true;
    } else {
      return false;
    }
  }

  filterCategory(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

    // onChange(event: EventTarget) {
    //   this.input = new FormData();
    //   const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    //   const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    //   this.input.append('fileToUpload', target.files[0]);
    //   this.input_images.push(this.input);
    //   // console.log(this.input_images, 'input images');
    //   // console.log(this.input, 'input');
    //   // this.isLinear= true;
    //   this.files = target.files;
    //   this.image = this.files;
    // alert(this.image)
    //   if (this.fileList.indexOf(this.files[0]) === -1) {
    //     this.fileList.push(this.files[0]);
    
    
    //   }
    //   const reader1 = new FileReader();
    //   reader1.onload = (e: any) => {
    //     if (this.ImgSrc.indexOf(e.target.result) === -1) {
    //       this.ImgSrc.push(e.target.result);
    //       this.varImg= this.ImgSrc
    // alert(this.ImgSrc)
    //       console.log('Base64Image', this.ImgSrc);
    //       // this.stepperFirstpage.patchValue({add_images: reader1.result});
    //     }
    //   };
    
    //   reader1.readAsDataURL(this.fileList[(this.fileList.length - 1)]);
    // }


  // onChange(event) {
  // this.image= <File>event.target.files[0];
  //   this.imageName= event.target.files[0].name;
  //   console.log('Event is.............',<File>event.srcElement.files[0].name);

  // }
  onChange($event) {
    this.image= $event.target.files[0];
    this.image= <File>$event.target.files[0];
    this.imageName=  $event.target.files[0].name ;
    console.log('Event is.............',<File>$event.srcElement.files[0].name);

  
    //
    // console.log('Event on OnChange',$event.target.files[0]);
    console.log('Event on OnChange',this.image);
    this.app_Service.onupload(this.image).subscribe((response) => {
            // console.log('set any success actions...');
          
            swal({
                type: 'success',
                title: 'PIcture Uploaded.\n' +
                '\n',
                // text: 'Please check your username or password',
                showConfirmButton: false,
                width: '512px',
                timer: 2000
          
              }); 

        },
        (error) => {
          console.log('set any error actions...');
      })

      }

  onUpload(){
    const fd= new FormData();
    this.loader.post(Config.api + '/showcase/Upload-Image',fd).subscribe(res=>{
      console.log('Responce is', res);
    })
  }


  removeItem(ind) {
    this.fileList.splice(ind, 1);
    this.ImgSrc.splice(ind, 1);
    this.imgOverLay= this.ImgSrc[ind];
    console.log('Image OverLay is............',this.imgOverLay);
    this.base64textString.splice(ind, 1);
  }
  closeNav(Mynav) {
    Mynav.style.height = '0%';

  }

  FuncCheckNumberOfImages() {
    if (this.fileList.length >= 5) {
      return false;
    } else {
      return true;
    }
  }

  selectCat(event){
    this.catID = event;
  }

  createShowCase(f: NgForm){
  console.log('images is',this.imageName);
       this.imageAddress= this.apiURL+ this.imageName;
    this.app_Service.uploadShowCase(
      this.imageAddress,
      this.model.catID,
      this.model.title,
      this.model.description,
      this.model.urls,
      this.model.requirement1,
      this.model.requirement2
    ).subscribe(

      data => {

        Swal('ShowCase successfully Created', '', 'success');

          this.router.navigate(['/profile'])

      },
      error => {

        // console.log('Error isss', error);
        Swal('Showcase Create error', '', 'error')

      });
  }
}
