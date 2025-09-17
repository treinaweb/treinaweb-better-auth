"use client"

import { createTask } from "@/app/service/task.service";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "./Modal";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn"
      disabled={pending}>

      { pending ? 'Adding...' : 'Submit'}

    </button>
  )
}

const initialState = {
  message: '',
  success: false
}

async function AddTaskAction(prevState: unknown, formData: FormData) {
  try {
    const text = formData.get('task')?.toString() || '';
    
    await createTask({
      id: uuidv4(),
      text: text
    })

    return { message: 'Task criada com sucesso!', success: true }
  } catch (error) {
    return { message: 'Falha ao cadastrar Task', success: false, error}
  }
}

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [state, formAction] = useActionState(AddTaskAction, initialState);

  useEffect(() => {
    if(state.success) {
      setModalOpen(false);
      router.refresh();
      state.success = false;
    }
  }, [state.success, router]);

  return (
   <div>
     <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
      Add New Task
      <div className="ml-2">
        <AiOutlinePlus size={18} />
      </div>
    </button>

    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
     <form action={formAction}>
      <h3 className="font-bold text-lg">Add New Task</h3>
      {state.message && (
        <p className={(state.message === 'Task criada com sucesso!') ? "text-green-500" : "text-red-500"}>
          {state.message}
        </p>
      )}
      <div className="modal-action">
        <input 
          type="text"
          name="task"
          placeholder="Adicione uma tarefa..."
          className="input input-bordered w-full"
        />
        <SubmitButton />
      </div>
     </form>
    </Modal>
   </div>
  )
}

export default AddTask;