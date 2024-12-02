document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('saveBtn');
    const homeBtn = document.getElementById('homeBtn'); 
  
    saveBtn.addEventListener('click', async () => {
      const appleMusic = parseInt(document.getElementById('appleMusic').value, 10);
      const spotify = parseInt(document.getElementById('spotify').value, 10);
      const youtube = parseInt(document.getElementById('youtube').value, 10);
  
      if (!isNaN(appleMusic) && !isNaN(spotify) && !isNaN(youtube)) {
        try {
          const response = await fetch('/users/updateMinutes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ appleMusic, spotify, youtube }),
          });
  
          if (response.ok) {
            const data = await response.json();
            alert('Minutes updated successfully!');
            console.log(data);
          } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
          }
        } catch (error) {
          console.error('Error updating minutes:', error);
          alert('An error occurred while updating minutes.');
        }
      } else {
        alert('Please enter valid numbers for all fields.');
      }
    });
  
    // Navigate back to home
    homeBtn.addEventListener('click', () => {
      window.location.href = 'home.html';
    });
  });
  
  