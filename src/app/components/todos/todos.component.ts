import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

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

  constructor(private todoService:TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(resp => {
      if (resp.err == null){
        this.todos = resp.res;
        this.todos.forEach(el=>{
          el.description = 'siema to jest jakiś długi opis, co o nim myślisz?'
        })
        this.filterTodo()
      }else{
        this.todos = null
        console.log(resp.err)
      }
    });
  }

  filterTodo(){
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

}
