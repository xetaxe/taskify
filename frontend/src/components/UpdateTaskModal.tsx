import { useState } from 'react';
import { updateTask } from '../api/taskApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export type ShowUpdateTaskModal = {
  show: boolean,
  taskId: number,
  initialTitle?: string | undefined,
  initialDescription?: string | undefined
}

type UpdateTaskModalProps = {
  taskId: number,
  initialTitle: string | undefined,
  initialDescription: string | undefined,
  closeModal: () => void,
}

export const UpdateTaskModal = ({ taskId, initialTitle, initialDescription, closeModal }: UpdateTaskModalProps) => {

  const queryClient = useQueryClient()

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const mutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      closeModal()
    },
  })
  return (
    <div className="taskmodal">
      <div className="taskmodal_wrapper">
        <div className="taskmodal_menu">
          <span className="taskmodal_close" onClick={closeModal}>
            <img src="/icons/add.svg" alt="" />
          </span>
          <div className="taskmodal_title">
            Update task:
          </div>
          <div className="taskmodal_inputs">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              // type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={() => {
              mutation.mutate({
                taskId: taskId,
                title: title,
                description: description,
              })
            }}>Update task</button>
          </div>
        </div>
      </div>
    </div>
  );
};
