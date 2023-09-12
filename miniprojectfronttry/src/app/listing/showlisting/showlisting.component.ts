import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { resaleDetailsResp } from 'src/app/models';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';
import { MakeappointmentComponent } from '../makeappointment/makeappointment.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-showlisting',
  templateUrl: './showlisting.component.html',
  styleUrls: ['./showlisting.component.css']
})
export class ShowlistingComponent implements OnInit{

  fb=inject(FormBuilder)
  
 
  formsearch!:FormGroup

  createsearch(){
    return this.fb.group({search:this.fb.control("")})
  }
  ngOnInit(): void {
    this.formsearch=this.createsearch()
    this.form=this.create();
    this.limit=this.form!.value['limit']
    this.offset=this.form!.value['offset']
    this.process()
    
    this.form.get('limit')!.valueChanges.subscribe(newLimit => {
      this.limit = newLimit;
      this.process()})

      this.userId=this.storageSvc.getUser();
  }

  nextPage() {
    this.pageNo++;
    this.offset+= +this.limit // Increment offset by the limit
    this.process();
    console.log(">>>currentOffset",this.offset);
    console.log(">>>limit",this.limit)
    console.log("Offset type:", typeof this.offset);
  }
  
  previousPage() {
    if (this.pageNo > 1) {
      this.pageNo--;
      this.offset -= +this.limit; // Decrement offset by the limit
      this.process();
      console.log(">>>currentOffset",this.offset);
    console.log(">>>limit",this.limit)
    console.log("Offset type:", typeof this.offset);
    }
  }

  aSvc=inject(AdminService)

  storageSvc=inject(StorageService)

  router=inject(Router)
  

  form!:FormGroup
  limit!:number
  offset!:number
  listings:resaleDetailsResp[]=[]
  pageNo:number=1
  userId!:string


  create():FormGroup{
   return this.fb.group({
      limit: this.fb.control<number>(5,Validators.required),
      offset: this.fb.control<number>(1,Validators.required)
    })
  }


  process(){
   this.aSvc.getListings(this.limit,this.offset).then(result=>{this.listings=result
  console.log(result)})
  }

  onSubmit() {
    const searchKeyword = this.formsearch.value.search;
    console.log('Search Keyword:', searchKeyword); 
  
    this.router.navigate(["user/" + this.storageSvc.getUser() + "/searchlisting"], { queryParams: { q: searchKeyword } });
  }
  

  

  

}
