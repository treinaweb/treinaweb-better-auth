import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className=" text-2xl font-bold">TASKS</h1>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Tasks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr key={'0000'}>
                <td className="w-full">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs mr-5 checkbox-primary"
                  />
                  <span>Reunião as 18:00</span>
                </td>
                <td className="flex gap-5">
                  <FiEdit color="blue" size={25}/>
                  <FaRegTrashAlt color="red" size={25} />
                </td>
              </tr>
              <tr key={'0001'}>
                <td className="w-full">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs mr-5 checkbox-primary"
                  />
                  <span>Ligar para vidraçaria</span>
                </td>
                <td className="flex gap-5">
                  <FiEdit color="blue" size={25}/>
                  <FaRegTrashAlt color="red" size={25} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
