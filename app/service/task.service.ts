"use server"

import { revalidatePath } from "next/cache";
import { ITask } from "../../types/ITask";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/app/lib/auth";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function createTask(todo: ITask): Promise<ITask> {
  const cookieStore = await cookies();
  const session = await auth.api.getSession({
    headers: {
      cookie: cookieStore.toString()
    }
  });

  if (!session?.user?.id) {
    throw new Error('Usuário não autenticado');
  }

  const task = await prisma.task.create({
    data: {
      text: todo.text,
      userId: session.user.id,
    }
  });
  revalidatePath('/');
  return task;
}

export async function getAllTasks() {
  const cookieStore = await cookies();
  const session = await auth.api.getSession({
    headers: {
      cookie: cookieStore.toString()
    }
  });

  if (!session?.user?.id) {
    return [];
  }

  return await prisma.task.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function updateTask(formData: FormData) {
  const id = formData.get('id') as string;
  const text = formData.get('text') as string;

  const cookieStore = await cookies();
  const session = await auth.api.getSession({
    headers: {
      cookie: cookieStore.toString()
    }
  });

  if (!session?.user?.id) {
    throw new Error('Usuário não autenticado');
  }

  try {
    await prisma.task.update({
      where: {
        id: id,
        userId: session.user.id
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

  const cookieStore = await cookies();
  const session = await auth.api.getSession({
    headers: {
      cookie: cookieStore.toString()
    }
  });

  if (!session?.user?.id) {
    throw new Error('Usuário não autenticado');
  }

  try {
    await prisma.task.delete({
      where: {
        id: id,
        userId: session.user.id
      }
    });
    revalidatePath('/');
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}