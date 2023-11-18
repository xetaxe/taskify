import { type TaskItem, Task } from "./Task";

export const TaskList = ({ tasks }: {tasks: TaskItem[]}) => {
  if (!tasks)
    return null

  return (
    <div className="tasklist">
      <div className="tasklist_title">
        Current tasks
      </div>
      <div className="tasklist_list">
        {tasks.map((task, index) => (
          <Task key={index} task={task} />
        ))}
      </div>
    </div>
  );
};