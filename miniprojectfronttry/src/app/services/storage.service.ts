import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user'
const JWT_KEY = 'auth-jwt'
const ROLE_KEY='auth-role'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  clean(): void {
    localStorage.clear();
  }

  saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  getUser(): any {
    const user = localStorage.getItem(USER_KEY)
    if (!!user) {
      return JSON.parse(user)
    }

    return {};
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem(USER_KEY);
    const jwt = localStorage.getItem(JWT_KEY);
    if (!!user && !!jwt) {
      return true;
    }
    this.resetJwt()
    this.resetUser()
    return false;
  }
  
    setJwt(jwt: string): void {
      localStorage.setItem(JWT_KEY, jwt)
  }

  getJwt(): string {
    return localStorage.getItem(JWT_KEY) || ''
  }

  resetJwt(): void {
    localStorage.removeItem(JWT_KEY)
  }

  setRole(role:string):void{
    localStorage.setItem(ROLE_KEY,role)
  }
  getRole():string{
    return localStorage.getItem(ROLE_KEY)||''
  }

  resetRole():void{
    return localStorage.removeItem(ROLE_KEY)
  }

  resetUser(): void {
    localStorage.removeItem(USER_KEY)
  }
}