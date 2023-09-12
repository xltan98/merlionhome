import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { goal, predPayload ,convertSelections} from 'src/app/models';
import { AdminService } from 'src/app/services/admin.service';
import { ServerService } from 'src/app/services/server.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent implements OnInit{

  router = inject(Router)
  storageSvc = inject(StorageService)
  serverSvc = inject(ServerService)
  adminSvc = inject(AdminService)
  fb=inject(FormBuilder)
  activatedRoute=inject(ActivatedRoute)
  
  ngOnInit(): void {

    this.userId = this.storageSvc.getUser()
    console.log(this.userId);
    this.form=this.createForm()
    
    
  }
  form!:FormGroup
  predictedValue:number=0
  userId!:string;

  createForm():FormGroup{
    return this.fb.group({
    userId:this.fb.control<string>(this.userId),
    year:this.fb.control<number>(2023,[Validators.required]),
    townCode:this.fb.control<number>(1,[Validators.required]),
    flatTypeCode:this.fb.control<number>(1,[Validators.required]),
    storeyRangeCode: this.fb.control<number>(1,[Validators.required]),
    floorAreaSqm:this.fb.control<number>(80,[Validators.required]),
    flatModelCode:this.fb.control<number>(80,[Validators.required]),
    remainingLeaseYear:this.fb.control<number>(80,[Validators.required]),
    predictedValue:this.fb.control<number>(0,[Validators.required])
    })
  }

  submit(){
    this.adminSvc.getPrediction(this.form.value as predPayload).then(result=>{this.predictedValue=result.predictedValue})
  }
  save() {
    this.form.patchValue({
      predictedValue: this.predictedValue,
      userId: this.userId,
    });
  
    const convertedGoal = convertSelections(this.form.value as goal);
    console.log(convertedGoal);
    this.adminSvc.setGoal(convertSelections(this.form.value as goal)).then(result=>{console.log(result.homeId)})
    this.router.navigate(['/user', this.userId, 'goal']);
  }

 


}
