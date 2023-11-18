import { useEffect, useState } from "react";
import { TaskList } from "./components/TaskList";
import { Layout } from "./components/layout/Layout";

function App() {
  
  const [tasks, setTasks] = useState([])

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
    </Layout>
  )
}

export default App
