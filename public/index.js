document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.getElementById('registerBtn');
    if (registerButton) {
      registerButton.addEventListener('click', () => {
        window.location.href = 'register.html';
      });
    }
  
    const signInButton = document.querySelector('button'); 
    if (signInButton) {
      signInButton.addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        if (email && password) {
          try {
            const response = await fetch('/users/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
            });
  
            if (response.ok) {
              alert('Login successful!');
              window.location.href = 'home.html'; 
            } else {
              const errorData = await response.json();
              alert(`Login failed: ${errorData.error}`);
            }
          } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred. Please try again later.');
          }
        } else {
          alert('Please enter your email and password.');
        }
      });
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const registerUserBtn = document.getElementById('registerUserBtn');
  
    if (registerUserBtn) {
      registerUserBtn.addEventListener('click', async () => {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        if (firstName && lastName && email && password) {
          try {
            const response = await fetch('/users/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ firstName, lastName, email, password }),
            });
  
            if (response.ok) {
              alert('Registration successful!');
              window.location.href = 'index.html'; 
            } else {
              const errorData = await response.json();
              alert(`Registration failed: ${errorData.error}`);
            }
          } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred. Please try again later.');
          }
        } else {
          alert('Please fill in all the fields!');
        }
      });
    }
  });
  