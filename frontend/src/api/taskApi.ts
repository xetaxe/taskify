const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getAllTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/v1/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const getOneTask = async (taskId: number) => {
  const response = await fetch(`${API_BASE_URL}/v1/tasks/${taskId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch task');
  }
  return response.json();
};

export const createTask = async (taskData: {title: string, description: string}) => {
  const response = await fetch(`${API_BASE_URL}/v1/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
};

export const updateTask = async (updateTaskData: {taskId: number, title: string | undefined, description: string | undefined}) => {
  if (!updateTaskData.title)
    return
  const response = await fetch(`${API_BASE_URL}/v1/tasks/${updateTaskData.taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(updateTaskData),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
};

export const deleteTask = async (taskId: number) => {
  const response = await fetch(`${API_BASE_URL}/v1/tasks/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  return response.json();
};