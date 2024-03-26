import React, { useContext, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { DeleteHandlerContext, EditHandlerContext } from "../App";

function TaskItem({ task, handleEditSubmit, editText, setEditText }) {
  const handleDelete = useContext(DeleteHandlerContext);
  const handleEdit = useContext(EditHandlerContext);
  const [check,setCheck]=useState(false);


  return (
    <div className="task-item justify-between flex items-center bg-gray-800 p-5 rounded hover:bg-gradient-to-r hover:from-teal-900 hover:to-gray-800 group">
      <div className="task-item-left flex gap-3">
        <span>
          <input type="checkbox" className="accent-teal-500" onChange={()=>setCheck(prevCheck => !prevCheck)}/>
        </span>

        {task.isEditable && (
          <form onSubmit={(e)=>handleEditSubmit(e,task.id)}>
            <input
              className="bg-transparent outline-none border-gray-600 border-b-2 pb-1 focus:border-teal-500"
              type="text"
              required
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          </form>
        )}
        {!task.isEditable && (
          <p className={`group-hover:text-teal-400 ${check ? "line-through" : ""}`}>{task.text}</p>
        )}
      </div>

      <div className="task-item-right flex gap-3">
        <button onClick={() => handleEdit(task.id)}>
          <AiOutlineEdit className="text-gray-500 hover:text-teal-500 cursor-pointer duration-300" />
        </button>

        <button onClick={() => handleDelete(task.id)}>
          <MdDeleteOutline className="text-gray-500 hover:text-red-500 cursor-pointer duration-300" />
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
