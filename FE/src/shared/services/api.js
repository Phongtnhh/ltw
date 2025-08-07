const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// User Management API
export const userAPI = {
  getUsers: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/admin/users?${queryString}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  createUser: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  updateUser: async (id, userData) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  deleteUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  changeUserStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    return response.json();
  },
};

// Role Management API
export const roleAPI = {
  getRoles: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/roles`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getRole: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/roles/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  createRole: async (roleData) => {
    const response = await fetch(`${API_BASE_URL}/admin/roles`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(roleData),
    });
    return response.json();
  },

  updateRole: async (id, roleData) => {
    const response = await fetch(`${API_BASE_URL}/admin/roles/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(roleData),
    });
    return response.json();
  },

  deleteRole: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/roles/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// Permission Management API
export const permissionAPI = {
  getPermissions: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/permissions`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getPermission: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/permissions/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  createPermission: async (permissionData) => {
    const response = await fetch(`${API_BASE_URL}/admin/permissions`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(permissionData),
    });
    return response.json();
  },

  updatePermission: async (id, permissionData) => {
    const response = await fetch(`${API_BASE_URL}/admin/permissions/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(permissionData),
    });
    return response.json();
  },

  deletePermission: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/permissions/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getResources: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/permissions/resources`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// News API
export const newsAPI = {
  // Get latest news for homepage
  getLatestNews: async () => {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getAllNews: async () => {
    const response = await fetch(`${API_BASE_URL}/client/news`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getNewsById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/client/news/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  createNews: async (formData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/news/postnews`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        // Không set Content-Type khi gửi FormData, browser sẽ tự động set
      },
      body: formData,
    });
    return response.json();
  },
};

// Generic API helper
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: getAuthHeaders(),
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
