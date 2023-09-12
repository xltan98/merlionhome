import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { LoginComponent } from '../login/login.component';
import {  Users } from 'src/app/models';


export interface DialogData {
  id: string,
  password: string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  form!: FormGroup
  errMsg!: string
  validUsername: boolean = true

  dialogRef = inject(MatDialogRef<SignupComponent>)
  matDialog = inject(MatDialog)
  loginDetails: DialogData = inject(MAT_DIALOG_DATA)
  fb = inject(FormBuilder)
  adminSvc = inject(AdminService)
  router = inject(Router)
  
  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: this.fb.control<string>(!!this.loginDetails ? this.loginDetails.id : '', [Validators.required]),
      name: this.fb.control<string>('', [Validators.required]),
      phone: this.fb.control<string>('',[Validators.required]),
      email: this.fb.control<string>('', [Validators.email,Validators.required]),
      password: this.fb.control<string>(!!this.loginDetails ? this.loginDetails.password : '', [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.fb.control<string>('', [Validators.required]),
      role:this.fb.control<string>('',[Validators.required])
    })
  }

  signup(): void {
    firstValueFrom(this.adminSvc.signupUser({ ... this.form.value } as Users))
      .then(resp => { 
        console.log('resp', resp)
        this.dialogRef.close()
        this.matDialog.open(LoginComponent, { data: {id: resp.id }})
      })
      .catch(err => {
        this.errMsg = err.error.message
      })
  } 

  validateUsername(): void {
    firstValueFrom(this.adminSvc.validateNewShopId(this.form.value['id']))
    .then(resp => {
      this.validUsername = resp.is_new
    })
  }

  invalid(): boolean {
    return this.form.pristine || this.form.invalid || !this.validUsername
  }
}
