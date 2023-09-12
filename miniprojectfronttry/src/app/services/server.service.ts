import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, firstValueFrom } from "rxjs";

import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { StorageService } from "./storage.service";

import { MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "../main/login/login.component";
import { Users } from "../models";

const MENU_OPEN = 'menu/open/'
const SHOP_OPEN = 'shop/open/'
const ORDER_OPEN = 'order/open/'

@Injectable()
export class ServerService {

    http = inject(HttpClient)
    storageSvc = inject(StorageService)
    router = inject(Router)
    activatedRoute = inject(ActivatedRoute)
    snackBar = inject(MatSnackBar)
    matDialog = inject(MatDialog)

    endpoint = '/api/'
    
    userId = ''

    user!: Users


    

    getUser(): Observable<Users> {
        return this.http.get<any>(this.endpoint + "user/open/" + this.userId)
    }

    setUser(userId: string): void {
        this.userId = userId
        firstValueFrom(this.getUser())
            .then(u => this.user = u)
            .catch(err => {
                if (err.error.message.startsWith("JWT expired")) {
                    this.storageSvc.resetJwt()
                    this.storageSvc.resetUser()
                    if(this.activatedRoute.snapshot.params['userId'] === this.storageSvc.getUser()){
                        this.snackBar.open(`Session has expired. Please log in again.`, '', { duration: 2500 })
                        this.matDialog.open(LoginComponent)    
                        this.router.navigate(['/'])
                    }
                } else {
                    this.snackBar.open(`${err.error.message} Redirecting you to the mainpage.`, '', { duration: 2500 })
                    this.router.navigate(['/'])
                }
            })
    }

  
}