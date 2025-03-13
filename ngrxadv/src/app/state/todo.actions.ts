import { createAction, props } from '@ngrx/store';
import { Task } from './todo.reducer';

export const createTask = createAction('[Todo] Create Task', props<{ task: Task }>()); // Include id
export const createTaskSuccess = createAction('[Todo] Create Task Success', props<{ task: Task }>());
export const createTaskFailure = createAction('[Todo] Create Task Failure', props<{ error: string }>());

export const updateTask = createAction('[Todo] Update Task', props<{ task: Task }>());
export const updateTaskSuccess = createAction('[Todo] Update Task Success', props<{ task: Task }>());
export const updateTaskFailure = createAction('[Todo] Update Task Failure', props<{ error: string }>());

export const toggleTask = createAction('[Todo] Toggle Task', props<{ id: string }>());
export const toggleTaskSuccess = createAction('[Todo] Toggle Task Success', props<{ id: string; complete: boolean }>());
export const toggleTaskFailure = createAction('[Todo] Toggle Task Failure', props<{ error: string }>());

export const deleteTask = createAction('[Todo] Delete Task', props<{ id: string }>());
export const deleteTaskSuccess = createAction('[Todo] Delete Task Success', props<{ id: string }>());
export const deleteTaskFailure = createAction('[Todo] Delete Task Failure', props<{ error: string }>());

export const resetAllTodos = createAction('[Todo] Reset All Todos');
export const resetAllTodosSuccess = createAction('[Todo] Reset All Todos Success');
export const resetAllTodosFailure = createAction('[Todo] Reset All Todos Failure', props<{ error: string }>());

export const loadTasks = createAction('[Todo] Load Tasks');
export const loadTasksSuccess = createAction('[Todo] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Todo] Load Tasks Failure', props<{ error: string }>());