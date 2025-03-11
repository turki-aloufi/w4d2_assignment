// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import { TaskService } from '../task.service';
// import { loadTasks, loadTasksSuccess, loadTasksFailure, createTask, createTaskSuccess, createTaskFailure, updateTask, updateTaskSuccess, updateTaskFailure, deleteTask, deleteTaskSuccess, deleteTaskFailure } from './todo.actions';

// @Injectable()
// export class TodoEffects {
//   constructor(private actions$: Actions, private taskService: TaskService) {}

//   loadTasks$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadTasks),
//       mergeMap(() =>
//         this.taskService.getAllTasks().pipe(
//           map(tasks => loadTasksSuccess({ tasks })),
//           catchError(error => of(loadTasksFailure({ error: error.message || 'Failed to load tasks' })))
//         )
//       )
//     )
//   );

//   createTask$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(createTask),
//       mergeMap(({ task }) =>
//         this.taskService.createTask(task).pipe(
//           map(createdTask => createTaskSuccess({ task: createdTask })),
//           catchError(error => of(createTaskFailure({ error: error.message || 'Failed to create task' })))
//         )
//       )
//     )
//   );

//   updateTask$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(updateTask),
//       mergeMap(({ task }) =>
//         this.taskService.updateTask(task).pipe(
//           map(() => updateTaskSuccess({ task })),
//           catchError(error => of(updateTaskFailure({ error: error.message || 'Failed to update task' })))
//         )
//       )
//     )
//   );

//   deleteTask$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(deleteTask),
//       mergeMap(({ id }) =>
//         this.taskService.deleteTask(id).pipe(
//           map(() => deleteTaskSuccess({ id })),
//           catchError(error => of(deleteTaskFailure({ error: error.message || 'Failed to delete task' })))
//         )
//       )
//     )
//   );
// }