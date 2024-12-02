document.addEventListener('DOMContentLoaded', () => {
    const updateDataBtn = document.getElementById('updateDataBtn');
    if (updateDataBtn) {
      updateDataBtn.addEventListener('click', () => {
        window.location.href = 'update.html';
      });
    }
  
    const checkSpotBtn = document.getElementById('checkSpotBtn');
    if (checkSpotBtn) {
      checkSpotBtn.addEventListener('click', () => {
        window.location.href = 'queue.html';
      });
    }
  });
  
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/users/me', { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage && data.firstName) {
          welcomeMessage.innerText = `Hello, ${data.firstName}`;
        } else {
          welcomeMessage.innerText = 'Hello, User';
        }
      } else {
        console.error('Failed to fetch user data');
        document.getElementById('welcomeMessage').innerText = 'Hello, User';
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      document.getElementById('welcomeMessage').innerText = 'Hello, User';
    }
  });
  