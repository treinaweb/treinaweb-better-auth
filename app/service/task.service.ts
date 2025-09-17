"use server"

import { revalidatePath } from "next/cache";
import { ITask } from "../../types/ITask";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function createTask(todo: ITask): Promise<ITask> {
  const task = await prisma.task.create({
    data: {
      text: todo.text,
    }
  });
  revalidatePath('/');
  return task;
}

export async function getAllTasks() {
  return await prisma.task.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function updateTask(formData: FormData) {
  const id = formData.get('id') as string;
  const text = formData.get('text') as string;

  try {
    await prisma.task.update({
      where: {
        id: id
      },
      data: {
        text: text
      }
    });

    revalidatePath('/');    
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

export async function deleteTask(formData: FormData) {
  const id = formData.get('id') as string;

  try {
    await prisma.task.delete({
      where: {
        id: id
      }
    });
    revalidatePath('/');
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}