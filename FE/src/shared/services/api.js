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

  getAllNews: async (params = {}) => {
    const queryParams = new URLSearchParams();

    // Thêm các tham số tìm kiếm
    if (params.page) queryParams.append('page', params.page);
    if (params.search) queryParams.append('search', params.search);
    if (params.category && params.category !== 'all') queryParams.append('category', params.category);

    const url = `${API_BASE_URL}/news${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await fetch(url, {
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

// User Management API
export const userAPI = {
  // Lấy danh sách người dùng với phân trang và tìm kiếm
  getUsers: async (params = {}) => {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.search) queryParams.append('search', params.search);
    if (params.role) queryParams.append('role', params.role);
    if (params.status) queryParams.append('status', params.status);

    const url = `${API_BASE_URL}/admin/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  // Lấy thông tin chi tiết một người dùng
  getUserById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  // Tạo người dùng mới
  createUser: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // Cập nhật thông tin người dùng
  updateUser: async (id, userData) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // Xóa người dùng
  deleteUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  // Thay đổi trạng thái người dùng
  changeUserStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    return response.json();
  },

  // Lấy thống kê người dùng
  getUserStats: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/users/stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// Dashboard API
export const dashboardAPI = {
  // Lấy tổng quan dashboard (stats + activities)
  getOverview: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard/overview`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  // Lấy thống kê tổng quan
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard/stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  // Lấy hoạt động gần đây
  getRecentActivities: async (limit = 10) => {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard/recent-activities?limit=${limit}`, {
      method: 'GET',
      headers: getAuthHeaders(),
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
