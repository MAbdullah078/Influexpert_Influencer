import { Component, OnInit } from '@angular/core';
import {App_service} from 'app/app.service'
import { PagerService } from '../_guards/paginator.service';

import { id } from '@swimlane/ngx-charts/release/utils';
@Component({
  selector: 'app-searchforgigs',
  templateUrl: './searchforgigs.component.html',
  styleUrls: ['./searchforgigs.component.scss']
})
export class SearchforgigsComponent implements OnInit {
rfms:any=[]
pager: any = {};
rfmss:any=[]

  constructor(public serv :App_service ,private pagerService: PagerService) { }

  ngOnInit() {
    this.rfm(1);
  }
  rfm(page: number){
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.serv.rfm(page).subscribe((data) => {
      this.rfms= data.results;
      // console.log(data.results[0]['id'])
      console.log(this.rfms)
      this.pager = this.pagerService.getPager(this.rfms['totalItems'], page, 10);
    })
  }

  setToprated(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
  }
    // setPagenotes(page: number) {
    //   if (page < 1 || page > this.pager.totalPages) {
    //     return;
    //   }
    // }


view(id)
{
console.log(id)
this.serv.rfms(id).subscribe((data) => {
  this.rfmss= data;
  console.log(data)
})
}







}
