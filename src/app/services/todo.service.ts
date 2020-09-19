import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Todo } from '../models/Todo';
import { apiResponse } from '../models/apiResponse';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl:string = `${environment.apiUrl}/api/todos`;

  constructor(private http:HttpClient) { }

  // Get Todos
  getTodos():Observable<apiResponse> {
    return this.http.get<apiResponse>(`${this.baseUrl}`);
    
  }

  // Delete Todo
  deleteTodo(todo:Todo):Observable<apiResponse> {
    const url = `${this.baseUrl}/setDelete`;
    return this.http.post<apiResponse>(url, {todo} ,httpOptions);
  }

  // Add Todo
  addTodo(todo:Todo):Observable<apiResponse> {
    return this.http.post<apiResponse>(this.baseUrl, {todo}, httpOptions);
  }

  addComment(todo:Todo, newComment: String):Observable<apiResponse> {
    const url = `${this.baseUrl}/addComment`;
    return this.http.post<apiResponse>(url, {todo, newComment}, httpOptions);
  }

  // Toggle Completed
  toggleCompleted(todo: Todo):Observable<apiResponse> {
    let url = `${this.baseUrl}/setDone`;
    if (todo.done) url = `${this.baseUrl}/setUndone`;
    return this.http.post<apiResponse>(url, {todo}, httpOptions);
  }
}
