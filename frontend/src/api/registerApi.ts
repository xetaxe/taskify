const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const login = async (credentials: { username: string; password: string }) => {
  const response = await fetch(`${API_BASE_URL}/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
};

export const signup = async (userData: { username: string; email: string, password: string }) => {
  const response = await fetch(`${API_BASE_URL}/v1/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Signup failed');
  }
  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/v1/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Logout failed');
  }
  return response.json();
};