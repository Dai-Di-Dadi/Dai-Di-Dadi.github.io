document.addEventListener('DOMContentLoaded', () => {
    const timeSelect = document.getElementById('timeSelect');
    const bookButton = document.getElementById('bookButton');
    const responseMessage = document.getElementById('responseMessage');
    const nameInput = document.getElementById('name');
  
    // Fetch available times from the backend
    async function fetchAvailableTimes() {
      try {
        const response = await fetch('https://daididadi-backend.onrender.com/api/available-times');
        const timeslots = await response.json();
  
        // Clear existing options
        timeSelect.innerHTML = '';
  
        // Populate the dropdown with available times
        timeslots.forEach(slot => {
          const option = document.createElement('option');
          option.value = slot.time;
          option.textContent = slot.time;
          timeSelect.appendChild(option);
        });
      } catch (error) {
        responseMessage.textContent = 'Error fetching available times';
        responseMessage.style.color = 'red';
      }
    }
  
    // Book the selected time slot
    async function bookSlot() {
      const selectedTime = timeSelect.value;
      const name = nameInput.value.trim();
  
      if (!name || !selectedTime) {
        responseMessage.textContent = 'Please enter your name and select a time slot';
        responseMessage.style.color = 'red';
        return;
      }
  
      const bookingData = {
        name: name,
        time: selectedTime,
      };
  
      try {
        const response = await fetch('https://daididadi-backend.onrender.com/api/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          responseMessage.textContent = 'Booking successful!';
          responseMessage.style.color = 'green';
        } else {
          responseMessage.textContent = `Error: ${result.error}`;
          responseMessage.style.color = 'red';
        }
      } catch (error) {
        responseMessage.textContent = 'Error booking the slot';
        responseMessage.style.color = 'red';
      }
    }
  
    // Event listeners
    bookButton.addEventListener('click', bookSlot);
  
    // Load available times when the page loads
    fetchAvailableTimes();
  });
  