function updateDateTime() {
     var currentDate = new Date(); 
     var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; 
     var timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

      document.getElementById('dateDisplay').textContent = currentDate.toLocaleDateString('en-US', dateOptions); document.getElementById('timeDisplay').textContent = currentDate.toLocaleTimeString('en-US', timeOptions); 
}

setInterval(updateDateTime, 1000); 