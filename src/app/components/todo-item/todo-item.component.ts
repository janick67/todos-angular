import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { TodoCommentComponent } from '../todo-comment/todo-comment.component';

import { Todo } from 'src/app/models/Todo';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  @Output() changeTodo: EventEmitter<Todo> = new EventEmitter();
  panelOpenState = false;

  constructor(private todoService:TodoService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  // Set Dynamic Classes
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.done
    }

    return classes;
  }

  onToggle(todo) {  
    this.todoService.toggleCompleted(todo).subscribe(resp => {// Toggle on server
      if (resp.err == null){
        this.todo.done = !todo.done;// Toggle in UI
        this.changeTodo.emit();
      }else{
        console.log(resp.err)
      } 
    });
  }

  dayCount(date:Date){
    let temp = new Date(date);
    let now = new Date;
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    let day = Math.floor((now.getTime() - temp.getTime()) / _MS_PER_DAY);
    if (day == 0) return 'Today'
    else if (day == 1) return 'Yesterday'
    else return `${day} days ago`
  }

  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }

  addComment(newComment:String){
    this.todoService.addComment(this.todo, newComment).subscribe(resp => {// Toggle on server
      if (resp.err == null){
        //this.todo = resp.res
        //this.changeTodo.emit();
      }else{
        console.log(resp.err)
      } 
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TodoCommentComponent,{width:'90%', maxWidth:'90%',data: this.todo.comments});
    dialogRef.afterClosed().subscribe(result => {
      if (typeof result !== 'undefined' && result.length > 0) this.addComment(result);
    });
  }

}
