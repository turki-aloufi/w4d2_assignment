import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from './state/todo.reducer';

interface TaskDTO {
  taskId: string; // Lowercase to match backend
  title: string;  // Lowercase to match backend
  description: string; // Lowercase to match backend
  completed: boolean; // Lowercase to match backend
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5202/api/task';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<TaskDTO[]>(this.apiUrl).pipe(
      map(tasks => tasks.map(t => ({
        id: t.taskId,
        name: t.title, // Match lowercase title
        complete: t.completed
      })))
    );
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<TaskDTO>(`${this.apiUrl}/${id}`).pipe(
      map(t => ({
        id: t.taskId,
        name: t.title, // Match lowercase title
        complete: t.completed
      }))
    );
  }

  createTask(task: Task): Observable<Task> {
    const taskDTO: TaskDTO = {
      taskId: task.id, // Lowercase to match backend
      title: task.name, // Lowercase to match backend
      description: '',   // Lowercase to match backend
      completed: task.complete // Lowercase to match backend
    };
    return this.http.post<TaskDTO>(this.apiUrl, taskDTO).pipe(
      map(t => {
        console.log('Created Task Response:', t); // Debug
        return {
          id: t.taskId,
          name: t.title, // Match lowercase title
          complete: t.completed
        };
      })
    );
  }

  updateTask(task: Task): Observable<void> {
    const taskDTO: TaskDTO = {
      taskId: task.id,
      title: task.name,
      description: '',
      completed: task.complete
    };
    return this.http.put<void>(`${this.apiUrl}/${task.id}`, taskDTO);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}