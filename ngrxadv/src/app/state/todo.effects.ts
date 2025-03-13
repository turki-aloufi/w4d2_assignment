import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TaskService } from '../task.service';
import {
  createTask, createTaskSuccess, createTaskFailure,
  updateTask, updateTaskSuccess, updateTaskFailure,
  toggleTask, toggleTaskSuccess, toggleTaskFailure,
  deleteTask, deleteTaskSuccess, deleteTaskFailure,
  resetAllTodos, resetAllTodosSuccess, resetAllTodosFailure,
  loadTasks, loadTasksSuccess, loadTasksFailure
} from './todo.actions';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      mergeMap(() =>
        this.taskService.getAllTasks().pipe(
          map(tasks => loadTasksSuccess({ tasks })),
          catchError(error => of(loadTasksFailure({ error: error.message })))
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTask),
      mergeMap(action =>
        this.taskService.createTask(action.task).pipe(
          map(task => {
            console.log('Task to Store:', task); // Debug
            return createTaskSuccess({ task });
          }),
          catchError(error => {
            console.error('Create Task Error:', error.error);
            return of(createTaskFailure({ error: error.message }));
          })
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTask),
      mergeMap(action =>
        this.taskService.updateTask(action.task).pipe(
          map(() => updateTaskSuccess({ task: action.task })),
          catchError(error => of(updateTaskFailure({ error: error.message })))
        )
      )
    )
  );

  toggleTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleTask),
      mergeMap(action =>
        this.taskService.getTask(action.id).pipe(
          mergeMap(task =>
            this.taskService.updateTask({ ...task, complete: !task.complete }).pipe(
              map(() => toggleTaskSuccess({ id: action.id, complete: !task.complete })),
              catchError(error => of(toggleTaskFailure({ error: error.message })))
            )
          ),
          catchError(error => of(toggleTaskFailure({ error: error.message })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      mergeMap(action =>
        this.taskService.deleteTask(action.id).pipe(
          map(() => deleteTaskSuccess({ id: action.id })),
          catchError(error => of(deleteTaskFailure({ error: error.message })))
        )
      )
    )
  );

  resetAllTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetAllTodos),
      mergeMap(() =>
        this.taskService.getAllTasks().pipe(
          mergeMap(tasks =>
            Promise.all(tasks.map(task => this.taskService.deleteTask(task.id))).then(() =>
              resetAllTodosSuccess()
            )
          ),
          catchError(error => of(resetAllTodosFailure({ error: error.message })))
        )
      )
    )
  );
}