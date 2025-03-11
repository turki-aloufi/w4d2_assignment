import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskService } from '../task.service';
import { Task } from '../state/todo.reducer';
import { selectAllTodos, selectError } from '../state/todo.selector';
import { loadTasksSuccess, createTaskSuccess, updateTaskSuccess, deleteTaskSuccess, setError, clearError } from '../state/todo.actions';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  todos$: Observable<Task[]>;
  error$: Observable<string | null>;
  isEditing: boolean = false;
  editingTaskId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private taskService: TaskService
  ) {
    this.todos$ = this.store.select(selectAllTodos);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', [Validators.minLength(2), Validators.required]],
      description: ['']
    });
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => this.store.dispatch(loadTasksSuccess({ tasks })),
      error: (err) => this.store.dispatch(setError({ error: err.message || 'Failed to load tasks' }))
    });
  }

  createTask(): void {
    if (this.todoForm.valid) {
      if (this.isEditing && this.editingTaskId) {
        const updatedTask = {
          taskId: this.editingTaskId,
          title: this.todoForm.value.title,
          description: this.todoForm.value.description,
          completed: this.getTaskById(this.editingTaskId)?.completed || false
        };
        this.taskService.updateTask(updatedTask).subscribe({
          next: () => {
            this.store.dispatch(updateTaskSuccess({ task: updatedTask }));
            this.isEditing = false;
            this.editingTaskId = null;
            this.todoForm.reset();
            this.store.dispatch(clearError());
          },
          error: (err) => this.store.dispatch(setError({ error: err.message || 'Failed to update task' }))
        });
      } else {
        this.taskService.createTask(this.todoForm.value).subscribe({
          next: (task) => {
            this.store.dispatch(createTaskSuccess({ task }));
            this.todoForm.reset();
            this.store.dispatch(clearError());
          },
          error: (err) => this.store.dispatch(setError({ error: err.message || 'Failed to create task' }))
        });
      }
    }
  }

  editTask(todo: Task): void {
    this.isEditing = true;
    this.editingTaskId = todo.taskId;
    this.todoForm.patchValue({
      title: todo.title,
      description: todo.description
    });
  }

  toggleTask(id: string): void {
    const task = this.getTaskById(id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      this.taskService.updateTask(updatedTask).subscribe({
        next: () => this.store.dispatch(updateTaskSuccess({ task: updatedTask })),
        error: (err) => this.store.dispatch(setError({ error: err.message || 'Failed to toggle task' }))
      });
    }
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.store.dispatch(deleteTaskSuccess({ id }));
        this.store.dispatch(clearError());
      },
      error: (err) => this.store.dispatch(setError({ error: err.message || 'Failed to delete task' }))
    });
  }

  private getTaskById(id: string): Task | undefined {
    let task: Task | undefined;
    this.todos$.subscribe(todos => {
      task = todos.find(t => t.taskId === id);
    }).unsubscribe();
    return task;
  }
}