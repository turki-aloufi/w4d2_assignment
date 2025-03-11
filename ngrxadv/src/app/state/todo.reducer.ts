import { createReducer, on } from "@ngrx/store";
import { createTask, toggleTask, deleteTask, resetAllTodos, updateTask } from "./todo.actions";

export type Task = {
  id: string,
  name: string,
  complete: boolean
}

export const initialState: Task[] = [];

export const todoReducer = createReducer(
  initialState,
  on(createTask, (state, { task }) => [
    ...state,
    {
      id: Date.now().toString(), // Generates a new ID for new tasks
      name: task.name,
      complete: task.complete
    }
  ]),
  on(toggleTask, (state, { id }) =>
    state.map(task => (task.id === id ? { ...task, complete: !task.complete } : task)) // Fixed to toggle, not just set to true
  ),
  on(deleteTask, (state, { id }) =>
    state.filter(task => task.id !== id)
  ),
  on(resetAllTodos, () => []),
  on(updateTask, (state, { task }) =>
    state.map(t => (t.id === task.id ? { ...task } : t)) // Updates existing task
  )
);