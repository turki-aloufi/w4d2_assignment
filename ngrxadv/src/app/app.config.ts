import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { todoReducer } from './state/todo.reducer';
import { provideEffects } from '@ngrx/effects';
// import { TodoEffects } from './state/todo.effects';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Add withFetch
import { TodoEffects } from './state/todo.effects';
import { TaskService } from './task.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    // provideHttpClient(withFetch()), // Enable fetch APIs
    provideStore({ task: todoReducer }),
    provideEffects([TodoEffects]),
    provideHttpClient(), // Required for HttpClient
    TaskService]
};