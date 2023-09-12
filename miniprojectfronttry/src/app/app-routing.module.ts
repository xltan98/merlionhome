import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { PredictComponent } from './user/predict/predict.component';
import { UserComponent } from './user/user/user.component';

import { GoalComponent } from './user/goal/goal.component';
import { canActivate } from './auth.guard';
import { UploadComponent } from './listing/upload/upload.component';
import { ShowlistingComponent } from './listing/showlisting/showlisting.component';
import { ShowlistingdetailComponent } from './listing/showlistingdetail/showlistingdetail.component';
import { MyappointmentComponent } from './listing/myappointment/myappointment.component';
import { RoleGuard } from './auth.service';
import { MyappointmentagentComponent } from './listing/myappointmentagent/myappointmentagent.component';
import { MylistingComponent } from './listing/mylisting/mylisting.component';
import { SearchlistingComponent } from './listing/searchlisting/searchlisting.component';


const routes: Routes = [
  { path: '', component: MainComponent, title: 'Home' },
  {
    path: 'user/:userId',
    component: UserComponent,canActivate: [canActivate],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'predict' },
      { path: 'predict', component: PredictComponent, title: 'Predict' },
      {path: 'goal',component:GoalComponent, title: 'My Goal' },
      {path:'upload',component:UploadComponent,canActivate: [RoleGuard], title: 'Upload' },
      {path:'listing',component:ShowlistingComponent, title: 'Listing' },
      {path:'listing/:uploadId',component:ShowlistingdetailComponent, title: 'Listing Detail' },
      { path: 'myappointment', component:MyappointmentComponent, title: 'My Appointment'  },
      {path:'agentAppointment',component:MyappointmentagentComponent,canActivate: [RoleGuard]},
      {path:'mylisting',component:MylistingComponent,canActivate: [RoleGuard], title: 'My Listing' },
      {path:'searchlisting',component:SearchlistingComponent, title: 'Listing Search' }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
