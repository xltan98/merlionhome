import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './main/login/login.component';
import { MainComponent } from './main/main/main.component';
import { SignupComponent } from './main/signup/signup.component';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServerService } from './services/server.service';
import { AdminService } from './services/admin.service';
import { StorageService } from './services/storage.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PredictComponent } from './user/predict/predict.component';
import { UserComponent } from './user/user/user.component';
import { GoalComponent } from './user/goal/goal.component';
import { CdkTableModule } from '@angular/cdk/table';
import { NgChartsModule } from 'ng2-charts';
import { UploadComponent } from './listing/upload/upload.component';
import { ShowlistingComponent } from './listing/showlisting/showlisting.component';
import { ShowlistingdetailComponent } from './listing/showlistingdetail/showlistingdetail.component';
import { SafePipe } from './safe.pipe';
import { MakeappointmentComponent } from './listing/makeappointment/makeappointment.component';
import { MyappointmentComponent } from './listing/myappointment/myappointment.component';
import { httpInterceptorProviders } from './interceptor/http.interceptor';
import { MylistingComponent } from './listing/mylisting/mylisting.component';
import { MyappointmentagentComponent } from './listing/myappointmentagent/myappointmentagent.component';
import { SearchlistingComponent } from './listing/searchlisting/searchlisting.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SignupComponent,
    PredictComponent,
    UserComponent,
    GoalComponent,
    UploadComponent,
    ShowlistingComponent,
    ShowlistingdetailComponent,
    SafePipe,
    MakeappointmentComponent,
    MyappointmentComponent,
    MylistingComponent,
    MyappointmentagentComponent,
    SearchlistingComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    CdkTableModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    NgChartsModule,
    
    
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: !isDevMode(),
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // })
    
  ],
  providers: [ServerService,AdminService,StorageService,httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
