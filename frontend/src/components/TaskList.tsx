import { useState } from "react";
import { type TaskItem, Task } from "./Task";
import { ShowUpdateTaskModal } from "./UpdateTaskModal";

type TaskListProps = {
  isLoggedIn: boolean,
  tasks: TaskItem[],
  updateTask: React.Dispatch<React.SetStateAction<ShowUpdateTaskModal>>
}

export const TaskList = ({ isLoggedIn, tasks, updateTask }: TaskListProps) => {

  const [editIndex, setEditIndex] = useState(-1)
  
  if (!tasks)
    return null

  const handleTaskClick = (taskId : number) => {
    if (!isLoggedIn)
      return
    if (editIndex === -1 || editIndex != taskId)
      setEditIndex(taskId)
    else
      setEditIndex(-1)
  }

  const handleUpdateTask = (task : TaskItem) => {
    if (!isLoggedIn)
      return
    updateTask({
      show: true,
      taskId: task.id,
      initialTitle: task.title,
      initialDescription: task.description
    })
  }

  return (
    <div className="tasklist" >
      <div className="tasklist_title">
        Current tasks
      </div>
      <div className="tasklist_list">
        {tasks.map((task) => (
          <Task key={task.id} edit={editIndex === task.id ? true : false} taskClick={handleTaskClick} updateTask={handleUpdateTask} task={task} />
        ))}
      </div>
    </div>
  );
};