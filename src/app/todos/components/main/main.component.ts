import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { TodoInterface } from 'src/app/todos/types/todo.interface';
import { TodosService } from 'src/app/todos/services/todos.service';
import { FilterEnum } from 'src/app/todos/types/filter.enum';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  visibleTodos$: Observable<TodoInterface[]> | undefined;

  constructor(private todosService: TodosService) {
    this.visibleTodos$ = combineLatest([
      this.todosService.todos$,
      this.todosService.filter$,
    ]).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        console.log('todos and filter :::', todos, filter);
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        } else {
          return todos;
        }
      })
    );
  }
}
