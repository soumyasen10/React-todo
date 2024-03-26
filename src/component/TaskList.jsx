import React from "react";
import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  error,
  loading,
  handleEditSubmit,
  editText,
  setEditText,
}) {
  return (
    <div className="flex flex-col gap-3 bg-gray-900 container mx-auto p-10 ">
      {loading ? (
        <p className="text-center">{error ? { error } : "Loading..."}</p>
      ) : (
        tasks.length == 0 && <p className="text-center">No task to show</p>
      )}
      {tasks.map((task) => (
        <TaskItem
          task={task}
          key={task.id}
          handleEditSubmit={handleEditSubmit}
          editText={editText}
          setEditText={setEditText}
        />
      ))}
    </div>
  );
}

export default TaskList;
