const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getToken = () => localStorage.getItem('hms_token');
export const getCurrentUser = () => JSON.parse(localStorage.getItem('hms_user') || 'null');
export const setAuth = ({ token, user }) => {
  localStorage.setItem('hms_token', token);
  localStorage.setItem('hms_user', JSON.stringify(user));
};
export const logoutUser = () => {
  localStorage.removeItem('hms_token');
  localStorage.removeItem('hms_user');
};

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const api = {
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => request('/auth/me'),

  dashboard: () => request('/dashboard'),

  doctors: () => request('/doctors'),
  createDoctor: (payload) => request('/doctors', { method: 'POST', body: JSON.stringify(payload) }),
  updateDoctor: (id, payload) => request(`/doctors/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteDoctor: (id) => request(`/doctors/${id}`, { method: 'DELETE' }),

  patients: () => request('/patients'),
  createPatient: (payload) => request('/patients', { method: 'POST', body: JSON.stringify(payload) }),
  updatePatient: (id, payload) => request(`/patients/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deletePatient: (id) => request(`/patients/${id}`, { method: 'DELETE' }),

  appointments: () => request('/appointments'),
  createAppointment: (payload) => request('/appointments', { method: 'POST', body: JSON.stringify(payload) }),
  updateAppointment: (id, payload) => request(`/appointments/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteAppointment: (id) => request(`/appointments/${id}`, { method: 'DELETE' }),

  prescriptions: () => request('/prescriptions'),
  createPrescription: (payload) => request('/prescriptions', { method: 'POST', body: JSON.stringify(payload) }),
  updatePrescription: (id, payload) => request(`/prescriptions/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deletePrescription: (id) => request(`/prescriptions/${id}`, { method: 'DELETE' }),

  notifications: () => request('/notifications'),
  markAllRead: () => request('/notifications/read-all', { method: 'PUT' }),
  markRead: (id) => request(`/notifications/${id}/read`, { method: 'PUT' }),
  deleteNotification: (id) => request(`/notifications/${id}`, { method: 'DELETE' }),

  profile: () => request('/users/profile'),
  updateProfile: (payload) => request('/users/profile', { method: 'PUT', body: JSON.stringify(payload) }),
  updateSettings: (payload) => request('/users/settings', { method: 'PUT', body: JSON.stringify(payload) }),
  changePassword: (payload) => request('/users/change-password', { method: 'PUT', body: JSON.stringify(payload) }),
};
