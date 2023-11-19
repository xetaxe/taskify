import { useEffect, useState } from "react";
import { TaskList } from "./components/TaskList";
import { Layout } from "./components/layout/Layout";
import useCheckLoginStatus from "./hooks/useCheckLoginStatus";
import { LoginModal } from "./components/LoginModal";
import { CreateTaskButton } from "./components/CreateTaskButton";
import { CreateTaskModal } from "./components/CreateTaskModal";
import { UpdateTaskModal, type ShowUpdateTaskModal } from "./components/UpdateTaskModal";

function App() {
  
  const [tasks, setTasks] = useState([])
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)
  const [showUpdateTaskModal, setShowUpdateTaskModal] = useState<ShowUpdateTaskModal>({show: false})

  const isLoggedIn = useCheckLoginStatus()

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/tasks", {
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setTasks(data.tasks)
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <Layout isLoggedIn={isLoggedIn} showLogin={() => setShowLoginModal(true)}>
      <TaskList tasks={tasks} isLoggedIn={isLoggedIn} updateTask={setShowUpdateTaskModal}/>
      { isLoggedIn ? null
        : <CreateTaskButton createTask={() => setShowCreateTaskModal(true)}/>}
      { showLoginModal ? <LoginModal closeModal={() => setShowLoginModal(false)} onLogin={() => console.log("hola")} />
        : null}
      { showCreateTaskModal ? <CreateTaskModal closeModal={() => setShowCreateTaskModal(false)}/>
        : null}
      { showUpdateTaskModal.show ? 
          <UpdateTaskModal  
            initialTitle={showUpdateTaskModal.initialTitle} 
            initialDescription={showUpdateTaskModal.initialDescription} closeModal={() => setShowUpdateTaskModal({show: false})}
          />
        : null}
    </Layout>
  )
}

export default App
