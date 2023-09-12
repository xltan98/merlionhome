import { ElementRef, Injectable, inject } from "@angular/core";

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, firstValueFrom } from "rxjs";
import { ServerService } from "./server.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { StorageService } from "./storage.service";
import { GoalRes, ListingAppointment, ListingAppointmentRes, LoginDetails, Saving, SavingPoint, Users, goal, predPayload, resaleDetails, resaleDetailsResp } from "../models";

const USER = 'user/'
const AUTH = 'auth/'
const LISTING='listing/'



@Injectable()
export class AdminService {
  http = inject(HttpClient)
  serverSvc = inject(ServerService)
  storageSvc = inject(StorageService)
  snackBar = inject(MatSnackBar)

  uploadId:string=""

  saveUploadId(uploadId:string){
    this.uploadId=uploadId;
  }

  retrieveUploadId(){
    return this.uploadId
  }

  updateAppointmentStatus(appointmentId: number, newStatus: string): Promise<any> {
    const params = new HttpParams().set("newStatus", newStatus);
  
    return firstValueFrom(
      this.http.put<any>(
        this.serverSvc.endpoint + LISTING + `updateappointment/${appointmentId}`,
        {}, // You don't need to pass an empty object here
        { params: params } // Pass the params as an options object
      )
    );
  }

  deleteListing(uploadId:string):Promise<any>{
    return firstValueFrom(this.http.delete<any>(this.serverSvc.endpoint+LISTING+`deletelisting/${uploadId}`))
  }

  getAppointmentAgent(agentId:string):Promise<ListingAppointmentRes[]>{
    return firstValueFrom(this.http.get<ListingAppointmentRes[]>(this.serverSvc.endpoint+LISTING+`appointmentagent/${agentId}`))

  }
  getAgentListing(agentId:string):Promise<resaleDetailsResp[]>{
    return firstValueFrom(this.http.get<resaleDetailsResp[]>(this.serverSvc.endpoint+LISTING+`getlisting/${agentId}`))
  }


  deleteAppointment(appointmentId:number):Promise<any>{
    return firstValueFrom(this.http.delete<any>(this.serverSvc.endpoint+LISTING+`deleteappointment/${appointmentId}`))
  }

  getAppointment(userId:string):Promise<ListingAppointmentRes[]>{
    return firstValueFrom(this.http.get<ListingAppointmentRes[]>(this.serverSvc.endpoint+LISTING+ `appointment/${userId}`));
  }

  insertAppointment(payload:ListingAppointment):Promise<any>{
    return firstValueFrom(this.http.post<any>(this.serverSvc.endpoint+LISTING+'appointment',payload))
    
  }
  getListingById(uploadId:string):Promise<resaleDetailsResp>{
    return firstValueFrom(this.http.get<resaleDetailsResp>(this.serverSvc.endpoint+LISTING+`show/${uploadId}`))
  }
  getSearchedListings(searchword:string):Promise<resaleDetailsResp[]>{
    const params= new HttpParams()
    .set("searchword",searchword)
    

    return firstValueFrom(this.http.get<resaleDetailsResp[]>(this.serverSvc.endpoint+LISTING+'search',{params:params}))
  }
  getListings(limit:number,offset:number):Promise<resaleDetailsResp[]>{
    const params= new HttpParams()
    .set("limit",limit)
    .set("offset",offset);

    return firstValueFrom(this.http.get<resaleDetailsResp[]>(this.serverSvc.endpoint+LISTING+'show',{params:params}))
  }
  postUpload(payload:resaleDetails,elemRef:ElementRef):Promise<any>{
    const data = new FormData()
    data.append("payload",JSON.stringify(payload))
    const files=elemRef.nativeElement.files;

    for(let i=0; i< files.length; i++){
      data.append('imgFile',files[i])
    }
    return firstValueFrom(this.http.post<any>(this.serverSvc.endpoint+LISTING+'upload',data))
  }
  getChartSavingPoint(userId:string):Promise<SavingPoint[]>{
    return firstValueFrom(this.http.get<SavingPoint[]>(this.serverSvc.endpoint+USER+`save/get/${userId}`))

  }
  getTotalSaving(userId:string):Promise<any>{
    return firstValueFrom(this.http.get<any>(this.serverSvc.endpoint+USER+`save/${userId}`));

  }

  addSaving(payload:Saving):Promise<any>{

    return firstValueFrom(this.http.post<any>(this.serverSvc.endpoint+USER+'save',payload))

  }
  deleteGoal(homeId:number):Promise<any>{
    return firstValueFrom(this.http.delete<any>(this.serverSvc.endpoint+USER+`deletegoal/${homeId}`))
  }

  getGoal(userId:string):Promise<GoalRes[]>{

    return firstValueFrom(this.http.get<GoalRes[]>(this.serverSvc.endpoint+USER+`getgoal/${userId}`))
  }
  setGoal(payload:goal):Promise<any>{
    return firstValueFrom(this.http.post<any>(this.serverSvc.endpoint+USER+'settinggoal',{...payload}))
  }

  getPrediction(payload:predPayload):Promise<any>{
    return firstValueFrom(this.http.post<any>(this.serverSvc.endpoint+USER+'predict',{...payload}))
  }

  // userInfo(userId:string):Promise<any>{
  //   return firstValueFrom(this.http.get<any>(this.serverSvc.endpoint+USER+`open/${userId}`))
  // }

  updateUserPassword(oldPassword: string, newPassword: string) {
    return this.http.patch<any>(this.serverSvc.endpoint + AUTH + 'change-password', { userId: this.storageSvc.getUser(), oldPassword, newPassword })
  }

  checkLogin(): Promise<{ isLoggedIn: boolean, userId: string }> {
    return firstValueFrom(this.http.get<any>(this.serverSvc.endpoint + AUTH + 'validate-login'))
  }

  loginUser(loginDetails: LoginDetails): Observable<{ jwt: string, userId: string }> {
    return this.http.post<any>(this.serverSvc.endpoint + AUTH + 'login', { ...loginDetails })
  }

  signupUser(user: Users): Observable<Users> {
    return this.http.post<any>(this.serverSvc.endpoint + AUTH + 'signup', { ...user })
  }

  validateNewShopId(id: string): Observable<{ is_new: boolean }> {
    const params = new HttpParams()
      .set('id', id)
    return this.http.get<any>(this.serverSvc.endpoint + "user/open/" + 'new', { params })
  }

  logoutShop(): Observable<any> {
    return this.http.post<any>(this.serverSvc.endpoint + AUTH + 'logout', {})
    
  }

}