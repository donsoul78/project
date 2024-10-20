import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import session from 'express-session'; // For session management

const prisma = new PrismaClient();

const app = express();

//app.use(session({
    // secret: 'PLEASEEEEE', // Replace with a strong secret
    // resave: false,
    // saveUninitialized: false,
    // cookie: { secure: false } // Set to true if using HTTPS
 // }));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup session management (if needed)
// app.use(session({
//   secret: 'your_secret_key', // Change this to a secure random value
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }, // Set to true if using HTTPS
// }));

// Root Route with login form
app.get('/', (req: Request, res: Response) => {
    res.send(`
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Circles - Find your third place</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }
        .phone-container {
            width: 375px;
            height: 812px;
            margin: 20px auto;
            background: linear-gradient(135deg, #a8e063, #56ab2f);
            border-radius: 40px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        }
        .login-card {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: white;
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;
            padding: 30px;
            box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #8B4513;
            margin-bottom: 5px;
            font-size: 28px;
        }
        .subtitle {
            color: #666;
            margin-bottom: 20px;
            font-size: 16px;
        }
        input[type="text"], input[type="password"] {
            width: 100%;
            padding: 15px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 16px;
        }
        .forgot-password {
            text-align: right;
            font-size: 14px;
            color: #666;
            margin-bottom: 15px;
        }
        .remember-me {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            font-size: 14px;
        }
        .remember-me input {
            margin-right: 8px;
            transform: scale(1.2);
        }
        .sign-in-btn, .sign-up-btn {
            width: 100%;
            padding: 15px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .sign-in-btn {
            background-color: #8B4513;
            color: white;
        }
        .sign-up-btn {
            background-color: white;
            color: #8B4513;
            border: 2px solid #8B4513;
        }
    </style>
</head>
<body>
    <div class="phone-container">
        <div class="login-card">
            <h1>Circles</h1>
            <p class="subtitle">Find your third place.</p>
            <form action="/login" method="POST">
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" required>
                <div class="forgot-password">
                    <a href="#">Forgot Password</a>
                </div>
                <div class="remember-me">
                    <input type="checkbox" id="remember-me">
                    <label for="remember-me">Remember Me</label>
                </div>
                <button type="submit" class="sign-in-btn">Login</button>
            </form>
            <a href="/signup"><button type="button" class="sign-up-btn">Sign Up</button></a>
        </div>
    </div>
</body>
</html>
    `);
  });
  
  
  app.get('/signup', (req: Request, res: Response) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sign Up - Node.js App</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f2f5;
          }
          .signup-container {
            width: 300px;
            padding: 40px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .signup-container h2 {
            text-align: center;
            margin-bottom: 20px;
          }
          .signup-container form {
            display: flex;
            flex-direction: column;
          }
          .signup-container input {
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .signup-container button {
            padding: 10px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          .signup-container button:hover {
            background-color: #218838;
          }
        </style>
      </head>
      <body>
        <div class="signup-container">
          <h2>Sign Up</h2>
          <form action="/signup" method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </body>
      </html>
    `);
  });
  

  app.post('/signup', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    // Here you would handle storing the new user in the database
    // For now, we'll just log the details and send a response
    const user = await prisma.user.create({
        data: {
            email: email,
            password: password, // Use hashed password
            username: username,
        },
    });
    console.log(`New user signup: ${username}, ${email}`);
    res.send('Sign-up successful!');
  });


// Login route
app.post('/login', async (req: Request, res: Response) => {

  const { username, password } = req.body;

  // Dummy validation for demo purposes

  console.log("login received");

  const user = await prisma.user.findUnique({
    where: { username: username }
});

    if(user == null){
        res.send(`
            <h1>Login failed. Please try again.</h1>
            <a href="/">Go back to Login</a>
          `);
    }else{
        if (password !== user.password) { // Compare plain text passwords
            res.send(`
                <h1>Login failed. Please try again.</h1>
                <a href="/">Go back to Login</a>
              `);
            }else{
// Send response with token
console.log("log on is good")
//req.session.id = String(user.id);
//res.status(201).json({ message: 'log in is good.' });
res.redirect('/users');
            }
    }

});

// Fetch and display list of users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    let html = '<h1>List of Users</h1><ul>';
    users.forEach(user => {
      html += `<li>${user.username} (${user.email})</li>`;
    });
    html += '</ul>';
    
    // Add a button to navigate to /events-map
    html += `
      <button onclick="window.location.href='/events-map'" style="margin-top: 20px; padding: 10px 20px; font-size: 16px;">
        View Events on Map
      </button>
    `;

    res.send(html); // Send the response as HTML
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});

// Fetch and display list of events
app.get('/events', async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      include: { user: true }, // Include the associated user for each event
    });

    let html = '<h1>List of Events</h1><ul>';
    events.forEach(event => {
      html += `<li><strong>${event.eventName}</strong> - ${event.eventDate.toDateString()} 
               <br>Location: ${event.location} 
               <br>Hosted by: ${event.user?.username} (${event.user?.email})</li><br>`;
    });
    html += '</ul>';

    res.send(html); // Send the response as HTML
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
});

// Add a new user (dummy data)
app.post('/add-user', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123'
      }
    });
    res.json(user);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Error adding user');
  }
});

// Events map route with Google Maps integration

app.get('/events-map', async (req: Request, res: Response) => {
    try {
      const events = await prisma.event.findMany({
        include: { user: true },
      });
  
      let html = '<div id="event-list"><h1>List of Events</h1><ul>';
      let eventLocations: Array<{ eventName: string; location: string; user: string; eventDate: string }> = [];
  
      events.forEach(event => {
        html += `<li><strong>${event.eventName}</strong> - ${event.eventDate.toDateString()} 
                 <br>Location: ${event.location} 
                 <br>Hosted by: ${event.user?.username} (${event.user?.email})</li><br>`;
        
        eventLocations.push({
          eventName: event.eventName,
          location: event.location,
          user: event.user?.username || '',
          eventDate: event.eventDate.toDateString()
        });
      });
      html += '</ul></div>';
  
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Events and Map</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              height: 100vh;
            }
            #event-list {
              width: 30%;
              overflow-y: scroll;
              padding: 20px;
              background-color: #f4f4f4;
            }
            #map {
              width: 70%;
              height: 100%;
            }
            ul {
              list-style-type: none;
              padding: 0;
            }
            li {
              margin-bottom: 20px;
            }
            #add-event-btn {
              margin: 20px;
              padding: 10px 20px;
              background-color: #28a745;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }
            #add-event-form {
              display: none;
              margin-top: 20px;
              padding: 20px;
              background-color: #f4f4f4;
              border-radius: 5px;
            }
            #add-event-form input {
              width: 100%;
              margin-bottom: 10px;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
            }
            #add-event-form button {
              padding: 10px;
              background-color: #28a745;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }
          </style>
        </head>
        <body>
          ${html}
          <div id="map"></div>
          
          <button id="add-event-btn">Add Event</button>
          <div id="add-event-form">
            <h2>Add New Event</h2>
            <form action="/add-event" method="POST">
              <input type="text" name="eventName" placeholder="Event Name" required>
              <input type="text" name="location" placeholder="Location" required>
              <input type="date" name="eventDate" placeholder="Event Date" required>
              <button type="submit">Submit</button>
            </form>
          </div>
  
          <script>
            function initMap() {
              var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: { lat: 33.7490, lng: -84.3880 }
              });
  
              var events = ${JSON.stringify(eventLocations)};
  
              events.forEach(event => {
                geocodeAddress(event.location, function(latlng) {
                  var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: event.eventName
                  });
  
                  var infoWindow = new google.maps.InfoWindow({
                    content: '<strong>' + event.eventName + '</strong><br>' +
                             'Date: ' + event.eventDate + '<br>' +
                             'Hosted by: ' + event.user
                  });
  
                  marker.addListener('click', function() {
                    infoWindow.open(map, marker);
                  });
                });
              });
            }
  
            function geocodeAddress(address, callback) {
              var geocoder = new google.maps.Geocoder();
              geocoder.geocode({ address: address }, function(results, status) {
                if (status === 'OK') {
                  callback(results[0].geometry.location);
                } else {
                  console.error('Geocode was not successful for the following reason: ' + status);
                }
              });
            }
  
            // Toggle the Add Event form visibility
            document.getElementById('add-event-btn').addEventListener('click', function() {
              var form = document.getElementById('add-event-form');
              form.style.display = form.style.display === 'none' ? 'block' : 'none';
            });
          </script>
  
          <script async defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDFjStlUV-wxOSmqp6LKCNBnalQXoSLHWM&callback=initMap">
          </script>
        </body>
        </html>
      `);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).send('Error fetching events');
    }
  });
  
  

// Interactive map route with multiple pins
app.get('/map', (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Interactive Atlanta Map with Multiple Pins</title>
      <style>
        #map {
          height: 100vh;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        function initMap() {
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: { lat: 33.7490, lng: -84.3880 } // Center on Atlanta
          });

          // Example locations
          var locations = [
            { lat: 33.753746, lng: -84.386330 }, // Example Location 1
            { lat: 33.755, lng: -84.39 },        // Example Location 2
            { lat: 33.76, lng: -84.4 }           // Example Location 3
          ];

          locations.forEach(function(location) {
            new google.maps.Marker({
              position: location,
              map: map
            });
          });
        }
      </script>

      <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDFjStlUV-wxOSmqp6LKCNBnalQXoSLHWM&callback=initMap">
      </script>
    </body>
    </html>
  `);
});

app.post('/add-event', async (req: Request, res: Response) => {
    const { eventName, location, eventDate } = req.body;
  
    try {
      const newEvent = await prisma.event.create({
        data: {
          eventName,
          location,
          eventDate: new Date(eventDate),
          userId: 1,
          // You can omit userId since you're not using authentication
        },
      });
  
      res.redirect('/events-map');
    } catch (error) {
      console.error('Error adding new event:', error);
      res.status(500).send('Error adding new event');
    }
  });
  
  

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
