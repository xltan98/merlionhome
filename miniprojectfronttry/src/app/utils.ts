import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterState, RouterStateSnapshot } from "@angular/router";
import { StorageService } from "./services/storage.service";
import { inject } from "@angular/core";
import { AdminService } from "./services/admin.service";
import { firstValueFrom } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "./main/login/login.component";



export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    
) => {
    const storageSvc = inject(StorageService)
    const adminSvc = inject(AdminService)
    const router = inject(Router)
    const snackBar = inject(MatSnackBar)
    const matDialog = inject(MatDialog)

    return adminSvc.checkLogin()
    .then(resp => {console.log(resp)
        
        if(route.params['userId'] === resp.userId && storageSvc.getUser() === resp.userId) {
           
            return true
        } else {
            
         
                storageSvc.resetUser()
                storageSvc.resetJwt()
                snackBar.open('Something has gone wrong. Please login again.', '', {duration: 2500})
                router.navigate(['/'])
                matDialog.open(LoginComponent)
            
            return false
        }
    })
    .catch(err => {console.log(err)
        snackBar.open('You are not logged in.', '', {duration: 2500})
        router.navigate(['/'])
        matDialog.open(LoginComponent)    
        return false
    })
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);