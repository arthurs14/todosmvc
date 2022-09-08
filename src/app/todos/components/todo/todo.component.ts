import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodosService } from 'src/app/todos/services/todos.service';
import { TodoInterface } from 'src/app/todos/types/todo.interface';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  @Input('todo') todoProps: TodoInterface | undefined;
  @Input('isEditing') isEditingProps: boolean | undefined;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter();

  editingText: string | undefined;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.editingText = this.todoProps?.text;
  }

  setTodoInEditMode(): void {
    console.log('set todo in edit mode');
    this.setEditingIdEvent.emit(this.todoProps?.id);
  }

  removeTodo(): void {
    console.log('remove todo');
    this.todosService.removeTodo(this.todoProps!.id);
  }

  toggleTodo(): void {
    console.log('toggle todo');
    this.todosService.toggleTodo(this.todoProps!.id);
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
    console.log('change text');
  }

  changeTodo(): void {
    console.log('change todo', this.editingText);
    this.todosService.changeTodo(this.todoProps!.id, this.editingText!);
    this.setEditingIdEvent.emit(null);
  }
}
