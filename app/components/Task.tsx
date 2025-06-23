"use client";

import { ITask } from "@/types/ITask";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

interface TaskProps {
  task: ITask
}

export function Task({ task }: TaskProps) {
  const [isTaskDone, setIsTaskDone] = useState(false);

  return (
    <tr key={task.id}>
     <td className="w-full">
       <input 
         type="checkbox"
         checked={isTaskDone}
         className="checkbox checkbox-xs mr-5 checkbox-primary"
         onChange={() => setIsTaskDone(!isTaskDone)}
       />
       <span style={{textDecoration: isTaskDone ? "line-through" : "none"}}>
        {task.text}</span>
     </td>
     <td className="flex gap-5">
       <FiEdit color="blue" size={25}/>
       <FaRegTrashAlt color="red" size={25} />
     </td>
   </tr>
  )
}