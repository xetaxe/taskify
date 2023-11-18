import { type TaskItem, Task } from "./Task";

export const TaskList = ({ tasks }: {tasks: TaskItem[]}) => {
  if (!tasks)
    return null

  return (
    <div className="tasklist">
      {tasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </div>
  );
};