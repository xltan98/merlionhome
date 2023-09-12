import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  ngOnInit(): void {
   this.serverSvc.setUser(this.storageSvc.getUser())
   
  }



  serverSvc=inject(ServerService)
  storageSvc=inject(StorageService)
  router= inject(Router)

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

}
