document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/users/queueSpot');
      if (response.ok) {
        const { queueSpot } = await response.json();
        document.getElementById('queueMessage').innerText = `Your spot in the queue is: ${queueSpot}`;
      } else {
        document.getElementById('queueMessage').innerText = 'Failed to load queue spot. Please try again.';
      }
    } catch (error) {
      console.error('Error fetching queue spot:', error);
      document.getElementById('queueMessage').innerText = 'An error occurred. Please try again.';
    }
  });
  
  document.getElementById('homeBtn').addEventListener('click', () => {
    location.href = 'home.html';
  });
  