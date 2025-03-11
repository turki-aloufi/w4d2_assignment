
# Todo App (Angular Frontend)

This is a standalone Angular application that manages a todo list, interacting with a .NET Web API backend. It uses NgRx for state management and handles CRUD operations directly in the component, with error handling displayed in the UI.

## Features
- Create, read, update, and delete tasks.
- Toggle task completion status.
- Display error messages for failed API requests.
- Uses NgRx Store for state management without Effects.

## Prerequisites
- Node.js (v16+ recommended)
- Angular CLI (`npm install -g @angular/cli`)
- .NET Web API backend running at `http://localhost:7260/api/task` (see backend README)

## Project Structure
- src/
  - app/
    - app.component.ts        # Root component
    - app.config.ts           # Standalone app configuration
    - app.routes.ts           # Routing configuration
    - todo.component.ts       # Main todo component with CRUD logic
    - todo.component.html     # Template with UI and error display
    - todo.component.css      # Styles
    - state/
      - todo.actions.ts       # NgRx actions
      - todo.reducer.ts       # NgRx reducer with error state
      - todo.selector.ts      # NgRx selectors
  - task.service.ts          # Service for API calls
  - main.ts                  # Bootstrap file
```

## Setup Instructions
1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <angular-project-folder>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   ng serve
   ```
   - Open `http://localhost:4200` in your browser.

4. **Ensure Backend is Running:**
   - The app connects to `http://localhost:7260/api/task`. Start the .NET Web API (see backend README) before running Angular.

## Usage
- **Add Task:** Enter a title and optional description, then click "Add Task".
- **Edit Task:** Click the ✎ button, update the task, and click "Update Task".
- **Toggle Task:** Click ✓ to mark a task as completed (only shown for incomplete tasks).
- **Delete Task:** Click × to remove a task.
- **Error Handling:** Errors (e.g., "Failed to load tasks") appear in a red alert box if the backend is unavailable or an operation fails.

## Configuration
- **API URL:** Edit `task.service.ts` if the backend URL differs:
  ```typescript
  private apiUrl = 'http://localhost:7260/api/task';
  ```

## Dependencies
- `@angular/core`, `@angular/common`, `@angular/forms` for Angular functionality.
- `@ngrx/store` for state management.
- `rxjs` for Observables.
- Bootstrap (assumed in HTML for styling; add via CDN or `npm install bootstrap`).

## Troubleshooting
- **API Connection Error:** Ensure the .NET backend is running and CORS is enabled.
- **Blank Page:** Check the console (F12) for errors and verify `ng serve` output.
