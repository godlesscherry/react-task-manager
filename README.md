# Task Manager Application

## Overview
The **Task Manager Application** is a React-based tool for managing tasks with countdown timers. Users can create tasks, activate them, track their progress, and restart completed tasks. The app leverages Redux for state management and provides seamless navigation between pages.

---

## Features

### **Implemented Features**
1. **User Authentication:**
   - Log in using an email or username.
   - Store user information in the Redux store for session continuity.

2. **Task Creation:**
   - Add tasks with a unique name, background color, and countdown timer.
   - Preview tasks in the "pending" state.
   - Delete tasks in the "pending" state.

3. **Task Management:**
   - Categorize tasks as:
     - `Pending`: Not yet started.
     - `Active`: Tasks with running countdowns.
     - `Completed`: Tasks that have finished.
   - Real-time countdown for active tasks.

4. **Task Restart:**
   - Reset and restart completed tasks to their original timer.

5. **State Management:**
   - Use Redux for managing tasks and user information across the application.

6. **Navigation:**
   - Navigate seamlessly between pages:
     - Task Creation
     - Countdown

---

### **Pending Features**
The following features are currently not implemented but can be added with additional time:

1. **Task ID and Order Management:**
   - Ensure task IDs follow the order of creation.
   - Update the task order dynamically when tasks are deleted.

2. **Animations:**
   - Add animations for task activation to enhance the user experience.

3. **Marking Tasks as Ready:**
   - Restrict users from starting tasks independently.
   - Require all tasks to be marked "ready" before activation.

4. **Pause Timers:**
   - Ensure task timers pause automatically when navigating away from the countdown page.

5. **UI Enhancements:**
   - Replace the delete button with a cross icon.
   - Display countdown as "10 seconds" instead of "10s."

6. **Navigation Updates:**
   - Change the "Next" button to "Resume" when navigating back to the countdown page.

---

## Installation

### Prerequisites
- Node.js
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-manager-app.git
   cd task-manager-app
   ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the application
    ```bash
    npm run dev
    ```
4. Open your browser and navigate to
     ```bash
    http://localhost:5173/
    ```
## Usage

### Login:
Enter your email or username and password to log in.

### Task Creation:
Add tasks and preview them.
Delete unwanted tasks in the "pending" state.

### Countdown:
Activate tasks to start the timer.
Restart completed tasks as needed.

## Project Structure
```
src/
├── components/
│   ├── LoginPage.jsx
│   ├── TaskCreationPage.jsx
│   ├── CountdownPage.jsx
│   └── ...
├── store/
│   ├── taskSlice.js
│   ├── userSlice.js
│   └── ...
├── App.jsx
├── index.js
└── styles/
    └── ...

```
### Technologies Used
React: Frontend framework.
Redux: State management.
React Router: Navigation between pages.
CSS: Styling.
