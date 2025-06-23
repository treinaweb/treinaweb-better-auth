"use server"

import { revalidatePath } from "next/cache";
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

export async function getAllTasks() {
  const res = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });
  return res.json();
}

export async function updateTask(formData: FormData) {
  const id = formData.get('id') as string;
  const text = formData.get('text') as string;

  const updatedTask: ITask = {
    id: id,
    text: text,
  }

  try {
    await fetch(`${baseUrl}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    revalidatePath('/');    
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

export async function deleteTask(formData: FormData) {
  const id = formData.get('id') as string;

  try {
    await fetch(`${baseUrl}/tasks/${id}`, {
      method: 'DELETE',
    });
    revalidatePath('/');
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}