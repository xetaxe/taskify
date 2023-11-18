import { useState } from 'react';

type CreateTaskModalProps = {
  closeModal: () => void,
}

export const CreateTaskModal = ({ closeModal }: CreateTaskModalProps) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
            <button onClick={handleSubmit}>Add task</button>
          </div>
        </div>
      </div>
    </div>
  );
};
