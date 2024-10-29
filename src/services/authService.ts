export const authService = {
  async logout(): Promise<void> {
    try {
      // Clear all authentication-related items from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');

      // Clear all session storage items
      sessionStorage.clear();

      // Optional: Make an API call to invalidate the token on the server
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Important for cookies
      });

      // Clear any cookies if you're using them
      document.cookie.split(';').forEach(cookie => {
        document.cookie = cookie
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
      });
    } catch (error) {
      console.error('Logout failed:', error);
      throw new Error('Failed to logout properly');
    }
  }
};
