import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ServerService } from 'src/app/services/server.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit{

  router = inject(Router)
  storageSvc = inject(StorageService)
  serverSvc = inject(ServerService)
  adminSvc = inject(AdminService)
  fb=inject(FormBuilder)
  activatedRoute=inject(ActivatedRoute)

  form!:FormGroup

  @ViewChild('upload')
  Upload!:ElementRef

  ngOnInit(): void {
    this.form=this.createForm()
    
   
  }

  createForm(){
    return this.fb.group({
      uploader:this.storageSvc.getUser(),
      price: this.fb.control<number>(0, [Validators.required]),
      address: this.fb.control<string>('',[Validators.required]),
      postalCode:this.fb.control<number>(0,[Validators.required,Validators.pattern(/^\d{6}$/)]),
      floorAreaSqm:this.fb.control<number>(0,Validators.required),
      flatType: this.fb.control<string>('',Validators.required),
      storey:this.fb.control<number>(0,(Validators.required)),
      remainingLeaseYear:this.fb.control<number>(1,[Validators.required]),
      description:this.fb.control<string>('')
      
    })
  }
  submit() {
    console.log(this.form.value);
    this.adminSvc.postUpload(this.form.value, this.Upload)
      .then(resp => {
        console.log(resp);
        alert("Upload is successful");
      })
      .catch(error => {
        console.error("Error:", error);
        // Handle any potential error here.
      });
  }

    

}
