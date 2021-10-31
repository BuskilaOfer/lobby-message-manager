import { Component, OnInit } from '@angular/core';

// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item, JsonDbHandler, Todo } from './jsonDbHandler';
// import { of } from 'rxjs/observable/of';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
  todoList$: Observable<Item[]> | undefined;

  inputId: string | undefined;
  inputValue: Todo = {
    content: ''
  };
  todoCollection = new JsonDbHandler('Todolist.json');
  public editValue: boolean = false;
  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.todoList$ = of(this.todoCollection.getAllItems());
  }

  addNewItem() {
    if (this.inputValue.content != '') {
      this.inputValue.datemodified = new Date();
      this.inputValue.isDone = false;

      this.todoCollection.add(this.inputValue);
      this.inputValue.content = '';
      this.openSnackBar('Added Successfuly!', 'Dismiss');
    }
  }

  deleteItem(item: Item) {
    this.todoCollection.delete(item);
    this.openSnackBar('Item Deleted!', 'Dismiss');
    if ((this.editValue = true)) {
      this.editValue = false;
    }
    this.inputValue.content = '';
  }

  editItem(item: Item) {
    this.inputValue.content = item.content;
    this.editValue = true;
    this.inputValue.id = item.id;
  }

  // markItemAsDone(item) {
  //   this.inputValue.content = item.content;
  //   this.inputValue.isDone = true;
  //   // this.todoDoc = this.afs.doc(`Todolist/${item.id}`);
  //   // this.todoDoc.update(this.inputValue);
  //   this.inputValue.content = '';
  //   this.openSnackBar('Item Done!', 'Dismiss');
  // }

  // markItemAsNotDone(item) {
  //   this.inputValue.content = item.content;
  //   this.inputValue.isDone = false;
  //   // this.todoDoc = this.afs.doc(`Todolist/${item.id}`);
  //   // this.todoDoc.update(this.inputValue);
  //   this.inputValue.content = '';
  //   this.openSnackBar('Item Not Done!', 'Dismiss');
  // }

  saveNewItem() {
    if (this.inputValue.content != '') {
      this.inputValue.isDone = false;
      this.inputValue.datemodified = new Date();
      this.editValue = false;
      console.log(this.inputValue.id);
      this.todoCollection.update(this.inputValue);
      this.inputValue.content = '';
      this.openSnackBar('Updated Successfuly!', 'Dismiss');
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }


}
