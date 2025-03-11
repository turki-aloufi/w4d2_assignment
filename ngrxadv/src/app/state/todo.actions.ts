import { createAction, props } from '@ngrx/store';
import { Task } from './todo.reducer';

export const loadTasksSuccess = createAction('[Task] Load Tasks Success', props<{ tasks: Task[] }>());
export const createTaskSuccess = createAction('[Task] Create Task Success', props<{ task: Task }>());
export const updateTaskSuccess = createAction('[Task] Update Task Success', props<{ task: Task }>());
export const deleteTaskSuccess = createAction('[Task] Delete Task Success', props<{ id: string }>());
export const setError = createAction('[Task] Set Error', props<{ error: string }>());
export const clearError = createAction('[Task] Clear Error');