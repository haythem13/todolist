import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TodoapiService } from '../todoapi.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog } from '@angular/material';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private todo: TodoapiService, private _formBuilder: FormBuilder ) { }

  displayedColumns = ['title', 'date', 'status', 'edit'];
  todos;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  addTodo = new FormGroup({
    f1: new FormControl(''),
    f2: new FormControl('')
  });

  dataSource;



  ngOnInit() {
    this.todo.getTodos().subscribe(res => {

      this.todos = res.json();
      this.dataSource = new MatTableDataSource(res.json());


    });
    this.firstFormGroup = this._formBuilder.group({
      title: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      desc: ['', Validators.required]
    });

  }

  add(f1, f2) {

    const todo1 = {
      'title': f1.value.title,
      'desc': f2.value.desc,
      'date': new Date(),
      'done': false
    };

    this.todo.addtodo(todo1).subscribe(res => {
     // return res.json();
  this.ngOnInit();
    });

const f = '';
    const c = new Date();
    console.log(f1.value.title);
    console.log(f2.value);
    console.log(c);

  }
  add1(f1) {
    console.log(f1.value);

  }
  add2(f1) {
    console.log(f1.value);

  }

  applyFilter(filterValue: string) {

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches

    this.dataSource.filter = filterValue;
  }



}


