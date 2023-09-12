import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingAppointment, resaleDetailsResp } from 'src/app/models';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';

function dateValidator(control: FormControl): { [key: string]: boolean } | null {
  const selectedDate = new Date(control.value);
  const today = new Date();
  
  if (selectedDate < today) {
    return { 'pastDate': true }; // Validation failed
  }
  
  return null; // Validation passed
}
@Component({
  selector: 'app-makeappointment',
  templateUrl: './makeappointment.component.html',
  styleUrls: ['./makeappointment.component.css']
})
export class MakeappointmentComponent implements OnInit{
  aSvc=inject(AdminService)
  activatedRoute=inject(ActivatedRoute)
  router=inject(Router)
  uploadId!:string
  fb=inject(FormBuilder)
  listing!:resaleDetailsResp
  form!:FormGroup
  storageSvc=inject(StorageService)
  dialogRef = inject(MatDialogRef<MakeappointmentComponent>)

  userId!:string
  formattedDate!:string
  
  ngOnInit(): void {
    this.uploadId = this.aSvc.retrieveUploadId();
    this.userId = this.storageSvc.getUser();
  
    // Retrieve listing data asynchronously
    this.aSvc.getListingById(this.uploadId).then((result) => {
      this.listing = result;
  
      // Create the form group once you have the listing data
      this.form = this.createForm();
  
      console.log(result);
    });
  }
  
  createForm() {
    return this.fb.group({
      agentId: [this.listing?.uploader || ''],
      customerId: [this.userId || ''],
      date: ['', [Validators.required,dateValidator]],
      time: ['', [Validators.required]],
      address: [this.listing?.address || ''],
      status: [''],
      uploadId: [this.listing?.uploadId || ''],
    });
  }

  

  formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  

  submit(){
    const rawDateValue = this.form.get('date')?.value;
    this.formattedDate = this.formatDate(rawDateValue);
    this.form.patchValue({
      date:this.formattedDate,
      
      status:"unconfirmed"
    })

    this.aSvc.insertAppointment(this.form.value as ListingAppointment).then(result=>{console.log(result)})

    console.log(this.form.value)
    this.router.navigate(['user/',this.userId,'myappointment'])
    this.dialogRef.close()
    
  }

}
