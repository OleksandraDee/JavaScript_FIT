README.txt

Name: Oleksandra Dembitska
Module: Programming in HTML5
Assignment: Portfolio Website - Dublin at Night

Description:
This project is a portfolio website themed around "Dublin at Night." It showcases various web development skills, including the use of HTML5, CSS3, JavaScript, and third-party libraries. The website includes interactive features like a Leaflet map, a WebSocket communication example, an image gallery, and form validation.

References/Sources:
1. Leaflet Map Documentation - https://leafletjs.com/
2. Google Maps API Documentation - https://developers.google.com/maps/documentation
3. WebSocket Basics - https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
4. Socket.IO Documentation - https://socket.io/docs/
5. HTML5 Canvas Guide - https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
6. SVG Basics - https://developer.mozilla.org/en-US/docs/Web/SVG
7. JavaScript Form Validation - https://moodle.oiliuna.ie/pluginfile.php/80395/mod_resource/content/7/10.Form-Validation.pdf
8. W3Schools JavaScript and HTML5 APIs - https://www.w3schools.com/
9. OpenStreetMap Tiles - https://openstreetmap.org

Files Included:
- index.html: Home page with a brief introduction.
- portfolio.html: Portfolio page showcasing various interactive features.
- contact.html: Contact form with client-side validation.
- styles.css: Contains all the CSS styling for the website.
- portfolio.js: JavaScript file with functions for interactive elements on the portfolio page.
- contact.js: JavaScript file with form validation for the contact page.
- server.js: Node.js server setup to handle WebSocket communication with Socket.IO.
- images/: Folder containing images for the gallery and other visual elements.

Instructions to Run the Website:
1. Clone the project files to your local machine.
2. If using WebSocket, ensure you have Node.js and Socket.IO installed.
   - Run `npm install` to install the required dependencies in your project directory.
   - Start the WebSocket server by running `node server.js` in your terminal.
3. Open `index.html` in a web browser to access the website.
4. For interactive map functionality, ensure geolocation services are enabled in the browser.
5. The contact form requires JavaScript enabled for validation to work.

Notes:
- Some features may not work if JavaScript is disabled in the browser.
- WebSocket communication requires a local server running at `http://localhost:8080`.
- The Leaflet map includes geolocation functionality that may prompt the user for permission.
- To use Google Maps functionality, ensure that your API key is valid and not restricted.

