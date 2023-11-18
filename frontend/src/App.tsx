import { useEffect, useState } from "react";
import { TaskList } from "./components/TaskList";
import { Layout } from "./components/layout/Layout";
import useCheckLoginStatus from "./hooks/useCheckLoginStatus";
import { CreateTask } from "./components/CreateTask";

function App() {
  
  const [tasks, setTasks] = useState([])

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
    <Layout>
      <TaskList tasks={tasks}/>
      {
        isLoggedIn ?
          <div>hola</div>
        :
          <CreateTask />
      }
    </Layout>
  )
}

export default App
