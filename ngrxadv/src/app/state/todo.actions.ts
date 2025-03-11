import { createAction, props } from '@ngrx/store';
import {Task} from '../state/todo.reducer';

export const createTask = createAction('[Task] Create Task', props<{ task: Omit<Task, 'id'>}>());
export const deleteTask = createAction('[Task] Delete Task', props<{ id: string }>());
export const toggleTask = createAction('[Task] Toggle Task', props<{ id: string }>());
export const resetAllTodos = createAction('[Task] Reset All Todos');
export const updateTask = createAction('[Task] Update Task', props<{ task: Task }>());