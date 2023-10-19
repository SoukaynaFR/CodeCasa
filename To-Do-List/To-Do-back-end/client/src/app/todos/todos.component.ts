import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../Todo';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [TodoService],
})
export class TodosComponent implements OnInit {
  todos!: Todo[];

  constructor(private _todosService: TodoService) {}

  ngOnInit(): void {
    this.todos = [];
    this._todosService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  addTask(_$event: any, todoText: { value: any }) {
    var result;
    var newTask = {
      text: todoText.value,
      completed: false,
    };
    result = this._todosService.saveTodo(newTask);
    result.subscribe((_x) => {
      this.todos.push(new Todo(newTask.text, newTask.completed));

      todoText.value = '';
    });
  }

  setEditState(todo: any, state: any) {
    if (state) {
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

  updateStatus(todo: any) {
    var _todo = {
      _id: todo._id,
      Text: todo.text,
      completed: !todo.completed,
    };
    this._todosService.updateTodo(_todo).subscribe((_data) => {
      todo.completed = !todo.completed;
    });
  }

  updateTodoText(_$event: any, todo: any) {
    if (_$event.which === 13) {
      todo.text = _$event.target.value;
      var _todo = {
        _id: todo._id,
        text: todo.text,
        completed: todo.completed,
      };
      this._todosService.updateTodo(_todo).subscribe((_data) => {
        this.setEditState(todo, false);
      });
    }
  }

  deleteTask(todo: any) {
    this._todosService.deleteTodo(todo._id).subscribe(
      (data: any) => {
        if (data) {
          this.todos = this.todos.filter((item) => item._id !== todo._id);
        }
      },
      (error: any) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  deleteAllTasks() {
    for (const todo of this.todos) {
      this.deleteTask(todo);
    }
  }
}
