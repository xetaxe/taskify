import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createTask } from '../api/taskApi';

type CreateTaskModalProps = {
  closeModal: () => void,
}

export const CreateTaskModal = ({ closeModal }: CreateTaskModalProps) => {

  const queryClient = useQueryClient()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const mutation = useMutation({
    mutationFn: createTask,
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
            New task:
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
                title: title,
                description: description,
              })
            }}>Add task</button>
          </div>
        </div>
      </div>
    </div>
  );
};
