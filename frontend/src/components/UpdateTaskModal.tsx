import { useState } from 'react';

type UpdateTaskModalProps = {
  initialTitle: string,
  initialDescription: string
  closeModal: () => void,
}

export const UpdateTaskModal = ({ initialTitle, initialDescription, closeModal }: UpdateTaskModalProps) => {

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = () => {
    if (title && description) {
      // Simulating a successful login
      // onLogin(); // Pass username to parent component
      closeModal(); // Close the modal
    } else {
      console.log("nope")
    }
  };

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
            <button onClick={handleSubmit}>Update task</button>
          </div>
        </div>
      </div>
    </div>
  );
};
