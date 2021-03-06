import { Component, OnInit } from '@angular/core';
import {App_service} from 'app/app.service'
import { PagerService } from '../serv/paginator.service';

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
items;
pageSize = '8';
  constructor(public serv :App_service ,private pagerService: PagerService) { }

  ngOnInit() {
    this.rfm(1);
  }
  rfm(page: number){
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.serv.rfm(this.pageSize).subscribe((data) => {
      this.rfms= data.results;
      // console.log(data.results[0]['id'])
      // console.log(this.rfms)
      this.items = data.totalItems;
      console.log(this.items);
      this.pager = this.pagerService.getPager(this.rfms['totalPages'], page, 10);
    })
  }
  page(pageSize) {
    if (pageSize) {
      this.pageSize = pageSize;
      // if (localStorage.getItem('latestpage')) {
      //   var page_num: number = Number(localStorage.getItem('latestpage'));
      //   this.setPage(page_num);
      // } else {
        this.rfm(1);
      // }
    }
    else {
      delete this.pageSize;
    }
  }

  // setToprated(page: number) {
  //   if (page < 1 || page > this.pager.totalPages) {
  //     return;
  //   }
  // }
    // setPagenotes(page: number) {
    //   if (page < 1 || page > this.pager.totalPages) {
    //     return;
    //   }
    // }


view(id)
{
// console.log(id)
this.serv.rfms(id).subscribe((data) => {
  this.rfmss= data;
  // console.log(data)

})
}






}
