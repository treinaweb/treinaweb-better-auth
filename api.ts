import { ITask } from "./types/ITask";


const baseUrl = 'http://localhost:3001';

export async function createTask(todo: ITask): Promise<ITask> {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  return await res.json();
}

/* async function getAllTasks() {
  // Fetch all tasks from the database
}

async function updateTask() {
  // Update a task in the database
}

async function deleteTask() {
  // Delete a task from the database
} */