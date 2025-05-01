import axiosInstance from './axiosInstance';

export const checkAuth = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const response = await axiosInstance.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Boolean(response?.data?.id);
  } catch {
    return false;
  }
};
