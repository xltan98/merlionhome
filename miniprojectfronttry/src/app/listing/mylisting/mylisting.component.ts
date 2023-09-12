import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { resaleDetails, resaleDetailsResp } from 'src/app/models';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-mylisting',
  templateUrl: './mylisting.component.html',
  styleUrls: ['./mylisting.component.css']
})
export class MylistingComponent implements OnInit{
  aSvc= inject(AdminService)
  storageSvc=inject(StorageService)
  agentId!:string
  listings!:resaleDetailsResp[]
  uploadId!:string
 
  ngOnInit(): void {
    this.agentId=this.storageSvc.getUser();
    this.aSvc.getAgentListing(this.agentId).then(result=>{console.log(result)
    this.listings=result})
    
  }
 

  removeListing(index:number){
    if (index >= 0 && index < this.listings.length) {
      // Remove the property at the specified index
      this.uploadId=this.listings[index].uploadId;
      this.aSvc.deleteListing(this.uploadId).then(result=>{console.log(result)
      this.listings.splice(index, 1);}
      )
      
    }
  }

}
