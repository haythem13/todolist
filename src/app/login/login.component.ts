import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  });

  constructor(private loginservice: LoginService, private router: Router) { }

  ngOnInit() {
  }



  sub(f) {
    this.loginservice.login(f.value).subscribe(res => {
      console.log(res.json().data);
      const token = res.json().data.token;
      if (res.status === 200) {
      this.loginservice.savetoken(token);
        this.router.navigateByUrl('/home');
    }

    });
}
}
