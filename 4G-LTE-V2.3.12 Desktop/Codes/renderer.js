document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
  
    if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        // Send login credentials to the main process
        window.electronAPI.login({ username, password });
      });
    }
  
    // Handle login success
    window.electronAPI.onLoginSuccess((event, data) => {
      alert(data.message);
      // Redirect or perform other actions on successful login
    });
  
    // Handle login failure
    window.electronAPI.onLoginFailure((event, data) => {
      alert(data.message);
    });
  });