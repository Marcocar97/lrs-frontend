const API_URL = 'https://liquidwaterproofingacademy.com/api';

export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const loginUser = async (userData) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
    credentials: 'include', // si usas cookies o sesiones
  });
  return res.json();
};
