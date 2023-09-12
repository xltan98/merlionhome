import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './main/login/login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  matDialog = inject(MatDialog)
  
  // showCredits(): void {
  //   this.matDialog.open(CreditsComponent)
  // }

  login(): void {
    this.matDialog.open(LoginComponent)
  }
}
