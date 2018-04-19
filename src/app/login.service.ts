import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';


@Injectable()
export class LoginService {

  constructor(private http: Http) {



  }
  login(user) {
    return this.http.post('http://localhost:3000/Auth/login', user);
  }

  savetoken(token) {
    localStorage.setItem('token', token);
  }

  checkToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const jwtHelper: JwtHelper = new JwtHelper();
      console.log(jwtHelper.isTokenExpired(token));
     // return true;
      return !jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }
  getuserId(token) {
    const jwtHelper: JwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(token).id;
  }

}
