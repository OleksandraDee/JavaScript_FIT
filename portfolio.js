// Interective Map
// Step 1: create a map and set the initial view
const map = L.map('myMap').setView([0, 0], 2); // Start with a global view

// Step 2: specify the tiles from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

// Step 3: add a default marker to the map
L.marker([0, 0]).bindPopup('The center of the world').addTo(map);

// Step 4: add geolocation functionality
const button = document.getElementById('find-me');
const legend = document.getElementById('legend');

function doZoom() {
    // Check if Geolocation is supported
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                };

                // Set the map view to the user's location with zoom level 12
                map.setView([userLocation.lat, userLocation.lon], 12);
                
                // Add a marker at the user's location
                L.marker([userLocation.lat, userLocation.lon]).bindPopup('Your Location').addTo(map);

                // Update the legend with the user's current location
                legend.textContent = `Current Location: Lat ${userLocation.lat.toFixed(6)}, Lon ${userLocation.lon.toFixed(6)}`;
            },
            (error) => {
                console.error('Error getting geolocation:', error.message);
                alert('Unable to retrieve your location.');
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Add event listener to the button to trigger the zoom and location update
button.addEventListener('click', doZoom);



//----------------------------------------------
// Image Gallery - Show Full-Size Image
// Array of image paths for the gallery
const images = [
    'images/dublin1.jpg',
    'images/dublin2.jpg',
    'images/dublin3.jpg',
    'images/dublin4.jpg'
];

let currentIndex = 0; // To track the current image index

// Show the image in full view based on the index
function showImage(index) {
    if (index >= 0 && index < images.length) {
        currentIndex = index; // Set the current index
        const fullImage = document.getElementById('fullImage');
        fullImage.src = images[currentIndex];
        document.getElementById('fullImageContainer').style.display = 'flex'; // Make the container visible
    }
}

// Navigate images with direction (-1 for Previous, 1 for Next)
function navigateImage(direction) {
    currentIndex += direction;

    // Wrap around the image array if reaching the end or beginning
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    document.getElementById('fullImage').src = images[currentIndex];
}

// Close the full-size image view
function closeImage() {
    document.getElementById('fullImageContainer').style.display = 'none';
}

//----------------------------------------------
// the SVG color change
let state = 0;
function changeColor() {
    const cheek = document.getElementById("cheek");
    state = (state + 1) % 3;
    if (state === 0) {
        cheek.setAttribute("fill", "red");
    } else if (state === 1) {
        cheek.setAttribute("fill", "yellow");
    } else {
        cheek.setAttribute("fill", "lime");
    }
}

// Attach event listener to the SVG element after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    const cheek = document.getElementById("cheek");
    if (cheek) {
        cheek.addEventListener("click", changeColor);
    }
});

//----------------------------------------------
// Canvas Drawing
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('myCanvas');
    if (canvas) {
        const context = canvas.getContext('2d');

        // Set fill color to draw rectangles
        context.fillStyle = 'indigo';

        // Draw rectangles in each corner
        context.fillRect(0, 0, 50, 50);          // Top-left corner
        context.fillRect(250, 0, 50, 50);        // Top-right corner
        context.fillRect(0, 250, 50, 50);        // Bottom-left corner
        context.fillRect(250, 250, 50, 50);      // Bottom-right corner

        // Change the color and draw a centered rectangle
        context.fillStyle = 'lightslategray';
        context.fillRect(75, 75, 150, 150);      // Centered rectangle

        // Draw a circle with a border in the center of the canvas
        context.beginPath();
        context.arc(150, 150, 50, 0, 2 * Math.PI, false); // Centered circle
        context.fillStyle = 'darkorange';
        context.fill();                           // Fill the circle
        context.lineWidth = 5;
        context.strokeStyle = 'indigo';
        context.stroke();                         // Draw the border
        context.closePath();
    }
});

//----------------------------------------------
// HTML5 Local Storage
function saveToLocalStorage() {
    localStorage.setItem('visit', new Date().toLocaleString());
    alert("Visit saved!");
}

function showVisit() {
    const visit = localStorage.getItem('visit');
    document.getElementById('visitOutput').innerText = visit ? `Last visit: ${visit}` : "No visit data found.";
}

//----------------------------------------------
// WebSocket Connection
// Initialize Socket.IO client

let socket;

// Function to start the Socket.IO connection
function startWebSocket() {  // Updated function name to match HTML
    if (!socket) {
        console.log("Attempting to connect to the Socket.IO server...");

        // Connect to the server
        socket = io('http://localhost:8080');

        socket.on('connect', () => {
            console.log('Connected to the Socket.IO server');
            document.getElementById('webSocketOutput').innerText = 'Connected to the Socket.IO server';
            document.getElementById('sendGreetingButton').disabled = false; // Enable the Send button
        });

        // Listen for 'response' events from the server
        socket.on('response', (message) => {
            console.log('Message received from server:', message);
            document.getElementById('webSocketOutput').innerText = message;
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from the Socket.IO server');
            document.getElementById('webSocketOutput').innerText = 'Disconnected from the Socket.IO server';
            document.getElementById('sendGreetingButton').disabled = true; // Disable the Send button
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
            document.getElementById('webSocketOutput').innerText = 'Connection error occurred';
        });
    } else {
        alert("Socket.IO is already connected.");
    }
}

// Function to send a greeting message with name and country
function sendGreeting() {
    if (socket && socket.connected) {
        const name = document.getElementById('name').value;
        const country = document.getElementById('country').value;

        if (name && country) {
            console.log("Sending greeting:", { name, country });
            // Emit a 'greeting' event to the server
            socket.emit('greeting', { name, country });
        } else {
            alert("Please enter both your name and country.");
        }
    } else {
        alert("Socket.IO connection is not open.");
    }
}

// Ensure the 'Send Greeting' button is initially disabled
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('sendGreetingButton').disabled = true;
    console.log("WebSocket button initially disabled.");
});


//----------------------------------------------
// Web Worker
let worker;

function startWorker() {
    if (typeof(Worker) !== "undefined") {
        worker = new Worker("worker.js");
        worker.onmessage = function(event) {
            document.getElementById('workerOutput').innerText = "Worker says: " + event.data;
        };
    } else {
        document.getElementById('workerOutput').innerText = "Sorry, your browser doesn't support Web Workers.";
    }
}

function stopWorker() {
    if (worker) {
        worker.terminate();
        worker = undefined;
    }
}

