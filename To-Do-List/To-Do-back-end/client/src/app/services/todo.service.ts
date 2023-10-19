import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class TodoService {
  constructor(private _http: HttpClient) {}

  getTodos() {
    return this._http
      .get('http://localhost:3000/api/v1/getTasks')
      .pipe(map((res: any) => res));
  }
  saveTodo(todo: { text: any; completed: boolean }) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this._http
      .post('http://localhost:3000/api/v1/task', JSON.stringify(todo), {
        headers: headers,
      })
      .pipe(map((res: any) => res));
  }

  updateTodo(todo: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this._http
      .put(
        'http://localhost:3000/api/v1/task/' + todo._id,
        JSON.stringify(todo),
        { headers: headers }
      )
      .pipe(map((res: any) => res));
  }

  deleteTodo(id: any) {
    return this._http
      .delete('http://localhost:3000/api/v1/task/' + id)
      .pipe(map((res: any) => res));
  }
}
