import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { TodoapiService } from '../todoapi.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private todo: TodoapiService, private _formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  displayedColumns = ['index', 'title', 'date', 'status', 'edit'];
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

      // for (let i = 0 ; i < this.todos.length(); i++ ) {
      let i = 0;
      this.todos.forEach(todo => {
        todo['pos'] = i;
        i++;

      });
      console.log(this.todos);

      this.dataSource = new MatTableDataSource(this.todos);


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
  applyFilter(filterValue: string) {

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches

    this.dataSource.filter = filterValue;
  }
  getelement(element) {
    console.log(element);
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      minHeight: '500px',
      width: '500px',
      height: '500px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'homediag.component.html',
  styleUrls: ['./home.component.css']
})

export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
