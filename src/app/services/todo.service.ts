import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  baseUrl:string = 'http://localhost:3000/api/';

  constructor(private http:HttpClient) { }

  // Get Todos
  getTodos():Observable<apiResponse> {
    return this.http.get<apiResponse>(`${this.baseUrl}todos`);
  }

  // Delete Todo
  deleteTodo(todo:Todo):Observable<Todo> {
    const url = `${this.baseUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add Todo
  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, todo, httpOptions);
  }

  // Toggle Completed
  toggleCompleted(todo: Todo):Observable<any> {
    const url = `${this.baseUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }
}
