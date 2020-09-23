import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoComponent } from '../add-todo/add-todo.component';

import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos:Todo[];
  todosDone:Todo[];
  todosUndone:Todo[];
  todosDeleted:Todo[];
  todosDoneAndUndone:Todo[];

  constructor(private todoService:TodoService, public dialog: MatDialog) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(resp => {
      if (resp.err == null){
        this.todos = resp.res;
        this.filterTodo()
      }else{
        this.todos = null
        console.log(resp.err)
      }
    });
  }

  filterTodo(){
    console.log(this.todos)
    this.todosDone = this.todos.filter(todo => todo.done&&!todo.deleted)
    this.todosUndone = this.todos.filter(todo => !todo.done&&!todo.deleted)
    this.todosDeleted = this.todos.filter(todo => todo.deleted)
    this.todosDoneAndUndone = this.todos.filter(todo => !todo.deleted)
  }

  changeTodo(){ 
    this.filterTodo();
  }

  deleteTodo(todo:Todo) {
    this.todoService.deleteTodo(todo).subscribe(resp => {// Remove from server
      if (resp.err == null){
        todo.deleted = true // Remove From UI
        this.filterTodo();
      }else{
        console.log(resp.err)
      }
    });
  }

  addTodo(todo:Todo) {
    this.todoService.addTodo(todo).subscribe(resp => {
      if (resp.err == null){
        this.todos.push(resp.res);
        this.filterTodo();
      }else{
        console.log(resp.err)
      }
    });
  }

  addTodoDialog() {
    const dialogRef = this.dialog.open(AddTodoComponent,{width:'90%', maxWidth:'90%'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (typeof result.title !== null && result.title.length > 0) this.addTodo(result);
    });
  }

}
