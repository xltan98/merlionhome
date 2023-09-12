import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { ServerService } from 'src/app/services/server.service';
import { StorageService } from 'src/app/services/storage.service';
import { SignupComponent } from '../signup/signup.component';
import { LoginDetails } from 'src/app/models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  errMsg!: string

  matDialog= inject(MatDialog)
  dialogRef = inject(MatDialogRef<LoginComponent>)
  loginDetails: { id: string } = inject(MAT_DIALOG_DATA)
  fb = inject(FormBuilder)
  adminSvc = inject(AdminService)
  serverSvc = inject(ServerService)
  storageSvc = inject(StorageService)
  router = inject(Router)

  ngOnInit(): void {
    this.form = this.createForm();

  }

  createForm(): FormGroup {
    return this.fb.group({
      id: this.fb.control<string>(!!this.loginDetails ? this.loginDetails.id : '', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required])
    })
  }

  login(): void {
    if(this.storageSvc.isLoggedIn()) {
      this.storageSvc.resetJwt()
      this.storageSvc.resetUser()
      this.storageSvc.resetRole()
    }

    firstValueFrom(this.adminSvc.loginUser({ ... this.form.value } as LoginDetails))
      .then(resp => {
        console.log('resp', resp)
        this.storageSvc.setJwt(resp.jwt)
        this.storageSvc.saveUser(resp.userId)
        this.serverSvc.setUser(this.storageSvc.getUser())
        firstValueFrom(this.serverSvc.getUser()).then(result=>{this.storageSvc.setRole(result.role)})
        this.router.navigate(['/'])
        this.dialogRef.close()
      })
      .catch(err => {
        this.errMsg = err.error.message
      })

      

      
  }
  
  signup(): void {
    this.dialogRef.close()
    this.matDialog.open(SignupComponent, { data: {... this.form.value} })
  }
}
