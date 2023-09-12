import { Component, inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Observable, firstValueFrom } from 'rxjs';

import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ServerService } from 'src/app/services/server.service';
import { AdminService } from 'src/app/services/admin.service';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { Users } from 'src/app/models';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  router = inject(Router)
  matDialog = inject(MatDialog)
  storageSvc = inject(StorageService)
  serverSvc = inject(ServerService)
  adminSvc = inject(AdminService)

 

  ngOnInit(): void {
    if(this.storageSvc.isLoggedIn()) {
      this.serverSvc.setUser(this.storageSvc.getUser())
    }
    
    
  }

  login(): void {
    this.matDialog.open(LoginComponent)
  }

  signup(): void {
    this.matDialog.open(SignupComponent)
  }

  logout(): void {
    // firstValueFrom(this.adminSvc.logoutShop())
    //   .then(_ => {
        this.storageSvc.resetJwt()
        this.storageSvc.resetUser()
        this.router.navigate(['/'])
  //     })
  //     .catch(err => {
  //       alert(err.error.message)
  //     })
  // }
}

navigateToPredict(userId: string) {
  this.router.navigate(['/user', userId, 'predict']);
}
}
