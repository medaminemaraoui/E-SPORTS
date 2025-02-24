import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {

//System Authen garde les Information
  public isAuthenticated : boolean = false;
  public username : any;
  public roles : string[] = [];



  public users:any ={
    //admin : {password:'', roles: ['USER','ADMIN']},
    admin : {password:'123', roles: ['ADMIN']},
    amine : {password:'123', roles: ['USER']},

  }


  constructor(private router : Router) { }


  public login(username:string, password:string): boolean{
    if(this.users[username] &&
      this.users[username]['password']==password){
      this.isAuthenticated = true;
      this.username = username;
      this.roles = this.users[username]['roles'];
      return true
    } else {
      return false;
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.username = undefined;
    this.roles=[];
    this.router.navigateByUrl("/login")
  }
}
