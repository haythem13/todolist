import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mail = '';
  pass = '';

  loginForm = new FormGroup({
    mail: new FormControl('', [Validators.email, Validators.required]),
    pass: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit() {
  }
  sub(f) {
    console.log(f);
  }
}
