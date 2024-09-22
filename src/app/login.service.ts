import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  UserDetail: any[] = [];
  userLogin: boolean = false;

  constructor(private router:Router) {
    this.UserDetail = [{
      Name: 'Admin',
      Number: 1234567890,
      Username: "admin@gmail.com",
      Password: 'admin@1234',
    }]
  }

  getuserDetail() {
    return this.UserDetail;
  }
  addUser(Username: any, Password: any, name: any, number: any) {
    const userExists = this.UserDetail.some((item) => item.Username == Username);
    if (!userExists) {
      this.UserDetail.push({
        Name: name,
        Number: number,
        Username: Username,
        Password: Password
      })
      return true;
    }
    else {
      return false;

    }
    debugger

  }
  logiUser(Username: any, Password: any) {
    this.userLogin = this.UserDetail.some((item) => item.Username == Username && item.Password == Password)
    debugger
    const user = this.UserDetail.find(u => u.Username === Username && u.Password === Password);
    localStorage.setItem('currentUser', JSON.stringify(user));
    debugger
    console.log(this.userLogin)
    if (this.userLogin) {

      return true
    }
    else { return false }
    debugger
  }
  logOut():void
  {
    localStorage.removeItem('currentUser');
    if( localStorage.getItem('currentUser') !== null){
      this.router.navigate(['User/Login'])
    }
  }
  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}
