export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!getToken(); // ✅ Returns true if token exists
};

export const logout = () => {
  removeToken();
  window.location.href = "/"; // ✅ Redirect to login after logout
};
