import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';
import { Task } from '../state/todo.reducer';
import { selectAllTodos, selectCompletedTodos, selectIncompleteTodos } from '../state/todo.selector';
import { createTask, deleteTask, toggleTask, resetAllTodos, updateTask } from '../state/todo.actions';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  todos$: Observable<Task[]>;
  completedTodos$: Observable<Task[]>;
  incompletedTodos$: Observable<Task[]>;
  isEditing: boolean = false;
  editingTaskId: string | null = null; // Store only the ID, fetch task from store

  constructor(private fb: FormBuilder, private store: Store) {
    this.todos$ = this.store.select(selectAllTodos);
    this.completedTodos$ = this.store.select(selectCompletedTodos);
    this.incompletedTodos$ = this.store.select(selectIncompleteTodos);
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      name: new FormControl('', [Validators.minLength(2), Validators.required]),
    });
  }

  createTask(): void {
    if (this.todoForm?.valid) {
      if (this.isEditing && this.editingTaskId) {
        // Dispatch updateTask with the existing task ID
        this.store.dispatch(
          updateTask({
            task: {
              id: this.editingTaskId,
              name: this.todoForm.value.name,
              complete: this.getTaskById(this.editingTaskId)?.complete || false, 
            },
          })
        );
        this.isEditing = false;
        this.editingTaskId = null;
      } else {
        // Create new task
        this.store.dispatch(
          createTask({
            task: {
              name: this.todoForm.value.name,
              complete: false,
            },
          })
        );
      }
      this.todoForm.reset();
    }
  }

  editTask(todo: Task): void {
    this.isEditing = true;
    this.editingTaskId = todo.id; 
    this.todoForm.patchValue({
      name: todo.name
    });
  }

  toggleTask(id: string): void {
    this.store.dispatch(toggleTask({ id }));
  }

  deleteTask(id: string): void {
    this.store.dispatch(deleteTask({ id }));
  }

  resetAllTodos(): void {
    this.store.dispatch(resetAllTodos());
  }

  private getTaskById(id: string): Task | undefined {
    let task: Task | undefined;
    this.todos$.subscribe(todos => {
      task = todos.find(t => t.id === id);
    }).unsubscribe(); 
    return task;
  }
}