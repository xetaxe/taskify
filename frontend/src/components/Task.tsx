export type TaskItem = {
  title: string,
  description: string,
  author: string,
  created_at: string
}

export const Task = ({ task }: {task: TaskItem}) => {
  return (
    <div className="task">
      <span className="task_title">{task.title}</span>
      <p className="task_description">{task.description}</p>
      <div className="task_details">
        <span className="task_author">by: {task.author}</span>
        <span className="task_createdat">Created at: {task.created_at}</span>
      </div>
    </div>
  );
};