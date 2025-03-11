import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './todo.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('task');

export const selectAllTodos = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);

export const selectError = createSelector(
  selectTaskState,
  (state: TaskState) => state.error
);