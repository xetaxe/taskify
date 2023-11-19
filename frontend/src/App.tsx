import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { TaskList } from "./components/TaskList";
import { Layout } from "./components/layout/Layout";
import { LoginModal } from "./components/LoginModal";
import { CreateTaskButton } from "./components/CreateTaskButton";
import { CreateTaskModal } from "./components/CreateTaskModal";
import { UpdateTaskModal, type ShowUpdateTaskModal } from "./components/UpdateTaskModal";
import { getAllTasks } from "./api/taskApi";

function App() {
  
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)
  const [showUpdateTaskModal, setShowUpdateTaskModal] = useState<ShowUpdateTaskModal>({show: false})

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check for the presence of the session cookie
    const cookieExists = document.cookie.split(';').some((cookie) => {
      return cookie.trim().startsWith('session=');
    });

    setIsLoggedIn(cookieExists);
  }, []);


  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['tasks'],
    queryFn: getAllTasks,
  })

  return (
    <Layout isLoggedIn={isLoggedIn} showLogin={() => setShowLoginModal(true)} setIsLoggedIn={setIsLoggedIn}>
      { isLoading ?
          <span>Loading...</span>
        : null
      }
      { isError ?
          <span>There was some error fetching the data. Please try again later.</span>
        : null
      }
      { isSuccess ?
          <TaskList tasks={data.tasks} isLoggedIn={isLoggedIn} updateTask={setShowUpdateTaskModal}/>
        : null          
      }
      { isLoggedIn ? 
        <CreateTaskButton createTask={() => setShowCreateTaskModal(true)}/> 
        : null 
      }
      { showLoginModal ? 
        <LoginModal closeModal={() => setShowLoginModal(false)} setIsLoggedIn={setIsLoggedIn} />
        : null
      }
      { showCreateTaskModal ? 
        <CreateTaskModal closeModal={() => setShowCreateTaskModal(false)}/>
        : null
      }
      { showUpdateTaskModal.show ? 
          <UpdateTaskModal  
            initialTitle={showUpdateTaskModal.initialTitle} 
            initialDescription={showUpdateTaskModal.initialDescription} closeModal={() => setShowUpdateTaskModal({show: false})}
          />
        : null
      }
    </Layout>
  )
}

export default App
