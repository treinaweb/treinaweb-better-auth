import AddTask from "./components/AddTask";
import { ButtonSignOut } from "./components/Button";
import { TaskList } from "./components/TaskList";
import { auth } from "./lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="max-w-4xl mx-auto mt-4 text-end">
      {session && (<ButtonSignOut />)}
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className=" text-2xl font-bold">TASKS</h1>
        <AddTask />
        <TaskList />
      </div>
    </main>
  );
}
