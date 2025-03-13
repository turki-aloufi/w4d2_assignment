import { createReducer, on } from '@ngrx/store';
import {
  createTaskSuccess, updateTaskSuccess, toggleTaskSuccess, deleteTaskSuccess, resetAllTodosSuccess,
  createTaskFailure, updateTaskFailure, toggleTaskFailure, deleteTaskFailure, resetAllTodosFailure,
  loadTasksSuccess, loadTasksFailure
} from './todo.actions';

export type Task = {
  id: string; // GUID string from frontend
  name: string;
  complete: boolean;
};

export interface TaskState {
  tasks: Task[];
  error: string | null;
}

export const initialState: TaskState = {
  tasks: [],
  error: null
};

export const todoReducer = createReducer(
  initialState,
  on(createTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    error: null
  })),
  on(updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === task.id ? task : t)),
    error: null
  })),
  on(toggleTaskSuccess, (state, { id, complete }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === id ? { ...t, complete } : t)),
    error: null
  })),
  on(deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== id),
    error: null
  })),
  on(resetAllTodosSuccess, () => ({
    ...initialState
  })),
  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    error: null
  })),
  on(createTaskFailure, updateTaskFailure, toggleTaskFailure, deleteTaskFailure, resetAllTodosFailure, loadTasksFailure,
    (state, { error }) => ({
      ...state,
      error
    }))
);