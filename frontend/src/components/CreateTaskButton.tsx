type CreateTaskButtonProps = {
  createTask: () => void
}

export const CreateTaskButton = ({createTask}: CreateTaskButtonProps) => {
  return (
    <span className="createtask" onClick={createTask}>
      <span className="createtask_icon">
        <img src="/icons/add.svg" alt="" />
      </span>
      <span className="createtask_text">
        Add task
      </span>
    </span>
  );
};