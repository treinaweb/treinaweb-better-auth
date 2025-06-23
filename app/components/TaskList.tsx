import { getAllTasks } from "@/api";
import { ITask } from "@/types/ITask";
import { Task } from "./Task";

export async function TaskList() {
  const tasks = await getAllTasks();

  return (
    <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Tasks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task: ITask) => (
                <Task key={task.id}  task={task}/>
              ))}
            </tbody>
          </table>
        </div>
  )
}