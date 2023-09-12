import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { resaleDetailsResp } from 'src/app/models';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-searchlisting',
  templateUrl: './searchlisting.component.html',
  styleUrls: ['./searchlisting.component.css']
})
export class SearchlistingComponent implements OnInit {

  q!:string
  activatedRoute=inject(ActivatedRoute)
  aSvc=inject(AdminService)
  storageSvc=inject(StorageService)
  router=inject(Router)
  fb=inject(FormBuilder)
  
 
  formsearch!:FormGroup
  // http://localhost:4200/#/user/fred/listing/10e9fcf9
  listings:resaleDetailsResp[]=[]
  ngOnInit(): void {
    this.formsearch=this.createsearch()
    this.activatedRoute.queryParams.subscribe((params) => {
      const searchKeyword = params['q'];
      if (searchKeyword) {
        this.q = searchKeyword;
        this.aSvc.getSearchedListings(searchKeyword).then((result) => {
          this.listings = result;
        });
      }
    });
  }

  createsearch() {
    return this.fb.group({ search: this.fb.control('') });
  }

  onSubmit() {
    const searchKeyword = this.formsearch.value.search;
    console.log('Search Keyword:', searchKeyword);

    this.router.navigate(
      ['user/' + this.storageSvc.getUser() + '/searchlisting'],
      { queryParams: { q: searchKeyword } }
    );
  }

  navigateToDetails(uploadId: string) {
    const userId = this.storageSvc.getUser(); // Get the user ID from your service
    this.router.navigate(['user', userId, 'listing', uploadId]);
  }
  


  // search(){
  //   this.aSvc.getSearchedListings(this.form.value.search).then(result=>{console.log(result)})
   
  // }
}
