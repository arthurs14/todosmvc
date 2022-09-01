import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TodosComponent } from 'src/app/todos/components/todos/todos.component';
import { HeaderComponent } from 'src/app/todos/components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { TodoComponent } from 'src/app/todos/components/todo/todo.component';

import { TodosService } from './services/todos.service';

const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  },
];

@NgModule({
  declarations: [TodosComponent, HeaderComponent, MainComponent, TodoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [TodosService],
})
export class TodosModule {}