const API_BASE_URL = 'http://localhost:3000';

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
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
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
