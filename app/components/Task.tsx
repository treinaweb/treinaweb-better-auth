"use client";

import { deleteTask, updateTask } from "@/api";
import { ITask } from "@/types/ITask";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Modal } from "./Modal";

interface TaskProps {
  task: ITask
}

export function Task({ task }: TaskProps) {
  const [isTaskDone, setIsTaskDone] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  const handleUpdateAction = async (formData: FormData) => {
    await updateTask(formData);
    setOpenModalEdit(false);
  };

  const handleDeleteAction = async (formData: FormData) => {
    await deleteTask(formData);
    setOpenModalDelete(false);
  };

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
       <span
          onClick={() => setOpenModalEdit(true)}
          className="cursor-pointer"
       >
        <FiEdit color="blue" size={25}/>
       </span>
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form action={handleUpdateAction}>
            <h3 className="font-bold text-lg">Update Task</h3>
            <div className="modal-action">
              <input 
                type="hidden"
                name="id"
                value={task.id}
              />
              <input 
                type="text"
                name="text"
                defaultValue={task.text}
                className="input input-bordered w-full"
              />
              <button 
                type="submit"
                className="btn"
              >
                Update
              </button>
            </div>
          </form>
        </Modal>
       <span 
          onClick={() => setOpenModalDelete(true)}
          className="cursor-pointer">
        <FaRegTrashAlt color="red" size={25} />
       </span>
       <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
        <h3
          className="font-bold text-lg">
            Tem certeza que deseja excluir esta tarefa?
        </h3>
        <div className="modal-action">
          <form action={handleDeleteAction}>
            <input type="hidden" name="id" value={task.id} />
            <button type="submit" className="btn">
              Excluir
            </button>
          </form>
        </div>
       </Modal>
     </td>
   </tr>
  )
}