import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TodosService } from 'src/app/todos/services/todos.service';
import { TodoInterface } from 'src/app/todos/types/todo.interface';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo') todoProps: TodoInterface | undefined;
  @Input('isEditing') isEditingProps: boolean | undefined;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter();

  editingText: string | undefined;
  @ViewChild('textInput') textInput: ElementRef | undefined;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.editingText = this.todoProps?.text;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['isEditingProps'].currentValue) {
      this.textInput?.nativeElement.focus();
    }
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
