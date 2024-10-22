import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import session from 'express-session'; // For session management
import {eventPagehtml} from "./html"
import {eventPagehtml1} from "./html"
import path from 'path';

const prisma = new PrismaClient();

const app = express();
app.use(express.static('public')); // Make sure your static files are served from the public folder


app.set('view engine', 'ejs'); // Use EJS for templating
 app.set('views', path.join(__dirname, 'views')); // Set views directory
// app.use(express.static(path.join(__dirname, 'theEvents'))); // Serve static files

//app.use(session({
    // secret: 'PLEASEEEEE', // Replace with a strong secret
    // resave: false,
    // saveUninitialized: false,
    // cookie: { secure: false } // Set to true if using HTTPS
 // }));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
res.redirect('/theEvents');
            }
    }

});

app.get('/events', (req: Request, res: Response) => {
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

app.get('/theEvents', async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();
    res.render('events', { events });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  
});

app.get('/circle', async (req: Request, res: Response) => {
  
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Circles</title>
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
                  background: linear-gradient(135deg, #c9e8b8, #a8d8a0);
                  border-radius: 40px;
                  overflow: hidden;
                  position: relative;
                  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
              }
              .app-header {
                  padding: 20px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
              }
              .app-title {
                  color: #4a4a4a;
                  font-size: 24px;
                  font-weight: bold;
              }
              .profile-pic {
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  background-color: #ddd;
              }
              .search-bar {
                  margin: 0 20px;
                  padding: 10px 15px;
                  background-color: rgba(255, 255, 255, 0.5);
                  border-radius: 20px;
                  display: flex;
                  align-items: center;
              }
              .search-bar input {
                  border: none;
                  background: transparent;
                  width: 100%;
                  padding: 5px;
                  font-size: 16px;
              }
              .circles-list {
                  margin-top: 20px;
              }
              .circle-item {
                  margin: 10px 20px;
                  padding: 15px;
                  background-color: rgba(255, 255, 255, 0.7);
                  border-radius: 15px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
              }
              .circle-name {
                  font-weight: bold;
                  color: #4a4a4a;
              }
              .circle-count {
                  color: #777;
              }
              .add-button {
                  position: absolute;
                  bottom: 80px;
                  right: 20px;
                  width: 60px;
                  height: 60px;
                  background-color: white;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 30px;
                  color: #4a4a4a;
                  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              }
              .bottom-nav {
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  height: 60px;
                  background-color: white;
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                  border-top-left-radius: 20px;
                  border-top-right-radius: 20px;
              }
              .nav-item {
                  width: 40px;
                  height: 40px;
                  border: 2px solid black;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                  transition: background-color 0.3s;
                  background-color: #808080; /* Grey color for inactive buttons */
                  color: white;
              }
              .nav-item.active {
                  background-color: #8B4513; /* Brown color for active button */
              }
          </style>
      </head>
      <body>
          <div class="phone-container">
              <div class="app-header">
                  <div class="app-title">Your Circles</div>
                  <div class="profile-pic"></div>
              </div>
              <div class="search-bar">
                  <input type="text" placeholder="Search">
              </div>
              <div class="circles-list">
                  <div class="circle-item">
                      <span class="circle-name">Volleyballers</span>
                      <span class="circle-count">37 people</span>
                  </div>
                  <div class="circle-item">
                      <span class="circle-name">Day 1s</span>
                      <span class="circle-count">5 people</span>
                  </div>
                  <div class="circle-item">
                      <span class="circle-name">Grocery runs</span>
                      <span class="circle-count">20 people</span>
                  </div>
                  <div class="circle-item">
                      <span class="circle-name">Roommates</span>
                      <span class="circle-count">5 people</span>
                  </div>
                  <div class="circle-item">
                      <span class="circle-name">Friends</span>
                      <span class="circle-count">25 people</span>
                  </div>
                  <div class="circle-item">
                      <span class="circle-name">Artists</span>
                      <span class="circle-count">7 people</span>
                  </div>
              </div>
              <div class="add-button">+</div>
              <div class="bottom-nav">
  <div class="nav-item" data-page="/theevents"></div>
  <div class="nav-item" data-page="/events-map"></div>
  <div class="nav-item active" data-page="favorites"></div>
  <div class="nav-item" data-page="/coupon"></div>
</div>

          </div>
          <script>
  // Correct the class selector by adding the dot (.)
  const navItems = document.querySelectorAll('.nav-item');

  // Loop through each nav item and add the click event listener
  navItems.forEach(button => {
    button.addEventListener('click', function() {
      const url = this.getAttribute('data-page'); // Get the URL from the data attribute
      window.location.href = url; // Navigate to the specified URL
    });
  });
</script>
      </body>
      </html>
    `);
});

app.get('/coupon', async (req: Request, res: Response) =>{
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Profile Page</title>
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
                background-color: white;
                border-radius: 40px;
                overflow: hidden;
                position: relative;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            }

            .profile-header {
                padding: 24px;
            }

            .header-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .page-title {
                color: #795548;
                font-size: 28px;
                font-weight: bold;
            }

            .profile-pic {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background-color: #ddd;
                overflow: hidden;
            }

            .settings-section {
                padding: 0 24px;
                margin-top: 32px;
            }

            .settings-item {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 16px;
                color: #4a4a4a;
                font-size: 18px;
            }

            .settings-icon {
                width: 24px;
                height: 24px;
            }

            .activities-section {
                padding: 24px;
            }

            .section-title {
                color: #795548;
                font-size: 22px;
                font-weight: bold;
                margin-bottom: 16px;
            }

            .activities-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }

            .activity-tag {
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                color: #4a4a4a;
            }

            .tag-peach {
                background-color: #ffe4b5;
            }

            .tag-mint {
                background-color: #e0f2f1;
            }

            .tag-pink {
                background-color: #fce4ec;
            }

            .qr-section {
                padding: 24px;
                text-align: center;
            }

            .qr-code {
                width: 200px;
                height: 200px;
                margin: 0 auto;
                background-color: #f5f5f5;
            }

            .bottom-nav {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 64px;
                background-color: white;
                display: flex;
                justify-content: space-around;
                align-items: center;
                border-top: 1px solid #e0e0e0;
                padding: 0 20px;
            }

            .nav-button {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 2px solid black;
                background-color: #808080;
                cursor: pointer;
            }

            .nav-button.active {
                background-color: #8B4513;
            }

            @media (max-width: 375px) {
                .phone-container {
                    width: 100%;
                    height: 100vh;
                    margin: 0;
                    border-radius: 0;
                }
            }
        </style>
    </head>
    <body>
        <div class="phone-container">
            <div class="profile-header">
                <div class="header-content">
                    <div class="page-title">Profile</div>
                    <div class="profile-pic"></div>
                </div>
            </div>

            <div class="settings-section">
                <div class="settings-item">
                    <svg class="settings-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
                    </svg>
                    Settings
                </div>
                <div class="settings-item">
                    <svg class="settings-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    18+ verification
                </div>
            </div>

            <div class="activities-section">
                <div class="section-title">Activities</div>
                <div class="activities-grid">
                    <span class="activity-tag tag-peach">Sports</span>
                    <span class="activity-tag tag-mint">Kayaking</span>
                    <span class="activity-tag tag-pink">Studying in coffee shops</span>
                    <span class="activity-tag tag-peach">Running</span>
                    <span class="activity-tag tag-mint">Drinking boba</span>
                    <span class="activity-tag tag-pink">Going to movies</span>
                    <span class="activity-tag tag-peach">Paintball</span>
                    <span class="activity-tag tag-mint">Walking</span>
                    <span class="activity-tag tag-pink">Concerts</span>
                </div>
            </div>

            <div class="qr-section">
                <div class="section-title">Your QR Code</div>
                <div class="qr-code">
                    <img src="/qrcode.png" alt="QR Code" style="width: 100%; height: 100%;">
                </div>
            </div>

            <div class="bottom-nav">
                <div class="nav-button" data-url="/theevents"></div>
                <div class="nav-button" data-url="/events-map"></div>
                <div class="nav-button" data-url="/circle"></div>
                <div class="nav-button active"></div>
            </div>
        </div>
        <script>
        document.querySelectorAll('.nav-item').forEach(button => {
            button.addEventListener('click', function() {
                const url = this.getAttribute('data-url'); // Get the URL from the data attribute
                window.location.href = url; // Navigate to the specified URL
            });
            
        });
    </script>
    </body>
    
    </html>
  `);
} );


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



app.get('/events-map', async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      include: { user: true },
    });

    let html = '<div id="event-list"><h1></h1><ul>';
    let eventLocations: Array<{ eventName: string; location: string; user: string; eventDate: string }> = [];

    events.forEach(event => {
      eventLocations.push({
        eventName: event.eventName,
        location: event.location,
        user: event.user?.username || '',
        eventDate: event.eventDate.toDateString(),
      });
    });

    html += '</ul></div>';

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f4f4f4;
          }
          .phone-container {
            width: 375px;
            height: 812px;
            background-color: white;
            border-radius: 40px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
          }
          
          #map {
            height: 100%;
          }
          ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }
          li {
            margin-bottom: 20px;
          }
          #add-event-btn {
            position: absolute;
            bottom: 70px;
            left: 10px;
            right: 10px;
            padding: 15px 20px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          }
          #add-event-form {
            display: none;
            padding: 20px;
            background-color: #f4f4f4;
            border-radius: 5px;
            position: absolute;
            bottom: 140px;
            left: 10px;
            right: 10px;
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
            width: 100%;
          }
          .bottom-nav {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-around;
            padding: 15px;
            background-color: white;
            border-top: 1px solid #eee;
          }
          .nav-item {
            width: 24px;
            height: 24px;
            background-color: #ddd;
            border-radius: 50%;
          }
          .nav-item.active {
            background-color: #8B4513;
          }
        </style>
      </head>
      <body>
        <div class="phone-container">
          ${html}
          <div id="map"></div>
          <button id="add-event-btn">Add Event</button>
          <div id="add-event-form">
            <h2>Add New Event</h2>
            <form action="/add-event" method="POST">
              <input type="text" name="eventName" placeholder="Event Name" required>
              <input type="text" name="location" placeholder="Location" required>
              <input type="date" name="eventDate" required>
              <button type="submit">Submit</button>
            </form>
          </div>
          
          <!-- Bottom Navigation -->
          <div class="bottom-nav">
            <button class="nav-item" data-url="/theevents" aria-label="Home"></button>
            <button class="nav-item active" data-url="/events-map" aria-label="Events"></button>
            <button class="nav-item" data-url="/circle" aria-label="Notifications"></button>
            <button class="nav-item" data-url="/coupon" aria-label="Profile"></button>
          </div>
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

          // Navigation click handling
          document.querySelectorAll('.nav-item').forEach(button => {
            button.addEventListener('click', function() {
              const url = this.getAttribute('data-url');
              window.location.href = url;
            });
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

app.post('/mapMobile',  )
  
  

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
