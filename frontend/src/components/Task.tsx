export type TaskItem = {
  id: number,
  title: string,
  description: string,
  author: string,
  created_at: string
}

type TaskProps = {
  edit: boolean,
  task: TaskItem
  taskClick: (taskId: number) => void,
  updateTask: (task: TaskItem) => void
}

export const Task = ({ edit, task, taskClick, updateTask}: TaskProps) => {
  return (
    <div className="task" onClick={()=> taskClick(task.id)}>
      {edit 
        ? 
          <div className="task_edit">
            <div className="task_edit_buttons">
              <button className="task_edit_update" onClick={()=> updateTask(task)}>
                <img src="/icons/edit.svg" alt="Edit task" />
              </button>
              <button className="task_edit_delete">
                <img src="/icons/delete.svg" alt="Delete task" />
              </button>
            </div>
          </div> 
        : null 
      }
      <span className="task_title">{task.title}</span>
      <p className="task_description">{task.description}</p>
      <div className="task_details">
        <span className="task_author">by: {task.author}</span>
        <span className="task_createdat">Created at: {task.created_at}</span>
      </div>
    </div>
  );
};