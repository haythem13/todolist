import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';




@Injectable()
export class TodoapiService {

  constructor(private http: Http) { }
   jwtHelper: JwtHelper = new JwtHelper();

   gettoken() {
    return localStorage.getItem('token');
   }
  getuserId(token) {

     return this.jwtHelper.decodeToken(token).id;
   }

   getTodos() {
    return this.http.get('http://localhost:3000/Api/todos/' + this.getuserId(this.gettoken()) );
    }

    addtodo(todo) {
      return this.http.post('http://localhost:3000/Api/todos/' + this.getuserId(this.gettoken()) , todo);
    }

}
