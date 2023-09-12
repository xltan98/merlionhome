import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn, CanActivateChildFn } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from './services/storage.service';
import { LoginComponent } from './main/login/login.component';
import { AdminService } from './services/admin.service';
import { firstValueFrom } from 'rxjs';
 // Import the correct component

// export class AuthGuard implements CanActivate {
//   constructor(
//     private storageSvc: StorageService,
//     private router: Router,
//     private snackBar: MatSnackBar,
//     private matDialog: MatDialog
//   ) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   
  //   const token = localStorage.getItem('auth-jwt');

  //   if (token) {
      
  //     return true;
  //   } else {
    
  //     this.storageSvc.resetUser();
  //     this.storageSvc.resetJwt();
  //     this.snackBar.open("Something's gone wrong. Please log in again.", '', {
  //       duration: 2500,
  //     });
  //     this.router.navigate(['/']);
  //     this.matDialog.open(LoginComponent);

  //     return false; 
  //   }
  // }
  export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const storageSvc = inject(StorageService)
    const adminSvc = inject(AdminService)
    const router = inject(Router)
    const snackBar = inject(MatSnackBar)
    const matDialog = inject(MatDialog)

    return adminSvc.checkLogin()
    .then(resp => {
        // jwt is valid
        if(route.params['userId'] === resp.userId && storageSvc.getUser() === resp.userId) {
            // check if route accessed is for the appropriate shop
            return true
        } else {
            
                storageSvc.resetUser()
                storageSvc.resetJwt()
                snackBar.open('Something went wrong. Please log in again.', '', {duration: 2500})
                router.navigate(['/'])
                matDialog.open(LoginComponent)
            
            return false
        }
    })
    .catch(err => {
        snackBar.open('Please login', '', {duration: 2500})
        router.navigate(['/'])
        matDialog.open(LoginComponent)    
        return false
    })
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);

