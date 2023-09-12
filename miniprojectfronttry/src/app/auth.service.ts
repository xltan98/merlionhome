import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

snackBar = inject(MatSnackBar)
router=inject(Router)

  canActivate(): boolean {
    
    const userRole = localStorage.getItem('auth-role');

    
    if (userRole === 'Agent') {
      return true; 
    } else {
      this.snackBar.open('You are not authorize!', '', {duration: 2500})
      this.router.navigate(['/']);
      return false; 
    }
  }
}