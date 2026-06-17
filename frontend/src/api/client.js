const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('scalora_token');
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    },
    ...options
  });

  const body = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.message || 'Request failed');
  }
  return body;
}

export const api = {
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  contact: (payload) => request('/leads', { method: 'POST', body: JSON.stringify(payload) }),
  publicContent: () => request('/public/content'),
  leads: () => request('/admin/leads'),
  updateLeadStatus: (id, status) => request(`/admin/leads/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  services: () => request('/admin/services'),
  projects: () => request('/admin/projects'),
  testimonials: () => request('/admin/testimonials'),
  saveService: (item) => request(item.id ? `/admin/services/${item.id}` : '/admin/services', { method: item.id ? 'PUT' : 'POST', body: JSON.stringify(item) }),
  saveProject: (item) => request(item.id ? `/admin/projects/${item.id}` : '/admin/projects', { method: item.id ? 'PUT' : 'POST', body: JSON.stringify(item) }),
  saveTestimonial: (item) => request(item.id ? `/admin/testimonials/${item.id}` : '/admin/testimonials', { method: item.id ? 'PUT' : 'POST', body: JSON.stringify(item) }),
  removeService: (id) => request(`/admin/services/${id}`, { method: 'DELETE' }),
  removeProject: (id) => request(`/admin/projects/${id}`, { method: 'DELETE' }),
  removeTestimonial: (id) => request(`/admin/testimonials/${id}`, { method: 'DELETE' })
};
