const API_BASE = "http://localhost:8000/api";

export async function registerUser(username, email, password) {
  const response = await fetch(`${API_BASE}/accounts/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });
  return response.json();
}

export async function loginUser(username, password) {
  const response = await fetch(`${API_BASE}/accounts/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return response.json();
}

export async function fetchActivities(token) {
  const response = await fetch(`${API_BASE}/activities/`, {
    headers: { "Authorization": `Token ${token}` }
  });
  return response.json();
}

export async function logActivity(token, activity_type, duration_minutes, calories_burned) {
  const response = await fetch(`${API_BASE}/activities/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
    body: JSON.stringify({ activity_type, duration_minutes, calories_burned })
  });
  return response.json();
}
