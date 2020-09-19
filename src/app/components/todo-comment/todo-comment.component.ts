import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Comment } from '../../models/Comment';


@Component({
  selector: 'todo-comment',
  templateUrl: 'todo-comment.component.html',
  styleUrls: ['./todo-comment.component.scss']
})


export class TodoCommentComponent {
  newComment: String;


  constructor(@Inject(MAT_DIALOG_DATA) public comments: any){}
}
