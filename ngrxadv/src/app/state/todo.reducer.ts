import { createReducer, on } from '@ngrx/store';
import { loadTasksSuccess, createTaskSuccess, updateTaskSuccess, deleteTaskSuccess, setError, clearError } from './todo.actions';

export interface Task {
  taskId: string;
  title: string;
  description?: string;
  completed: boolean;
}

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
  on(loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks, error: null })),
  on(createTaskSuccess, (state, { task }) => ({ ...state, tasks: [...state.tasks, task], error: null })),
  on(updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.taskId === task.taskId ? task : t)),
    error: null
  })),
  on(deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.taskId !== id),
    error: null
  })),
  on(setError, (state, { error }) => ({ ...state, error })),
  on(clearError, (state) => ({ ...state, error: null }))
);