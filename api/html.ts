
const eventPagehtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Events</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }
        .phone-container {
            width: 375px;
            height: 812px;
            margin: 20px auto;
            background-color: white;
            border-radius: 40px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .content {
            padding: 20px;
        }
        h1 {
            color: #8B4513;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .profile-pic {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #ddd;
        }
        .section {
            margin-bottom: 20px;
        }
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .view-all {
            color: #8B4513;
            font-size: 0.9em;
        }
        .event-card {
            background-color: #FFE4B5;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 10px;
        }
        .event-card.attending {
            background-color: #E0FFFF;
        }
        .event-card.invited {
            background-color: #FFDAB9;
        }
        .event-title {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .event-details {
            font-size: 0.9em;
            color: #555;
        }
        .create-event {
            background-color: white;
            border: 2px solid #8B4513;
            color: #8B4513;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            margin-top: 20px;
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
        <div class="content">
            <h1>
                Your Events
                <div class="profile-pic"></div>
            </h1>
            
            <div class="section">
                <div class="section-header">
                    <h2>Your Events</h2>
                    <span class="view-all">View all</span>
                </div>
                <div class="event-card">
                    <div class="event-title">Volleyball with SEED</div>
                    <div class="event-details">🕒 7:30pm, Today | 📍 Nav Courts</div>
                    <div class="event-details">13/15 Attendees</div>
                </div>
                <div class="event-card">
                    <div class="event-title">Pottery Catch-Up</div>
                    <div class="event-details">🕒 7:30pm, Tomorrow | 📍 Art Center, Emory</div>
                    <div class="event-details">Bob the Builder</div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-header">
                    <h2>Attending</h2>
                    <span class="view-all">View all</span>
                </div>
                <div class="event-card attending">
                    <div class="event-title">Coffee chat abt internships</div>
                    <div class="event-details">🕒 7:30pm, Today | 📍 Kaldi's</div>
                    <div class="event-details">Maya</div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-header">
                    <h2>Invited</h2>
                    <span class="view-all">View all</span>
                </div>
                <div class="event-card invited">
                    <div class="event-title">Yap Sesh</div>
                    <div class="event-details">🕒 7:30pm, Today | 📍 NAV North 490</div>
                    <div class="event-details">Max, Sam, 2 others</div>
                </div>
                <div class="event-card invited">
                    <div class="event-title">Flag Football</div>
                    <div class="event-details">🕒 7:30pm, Today | 📍 Stamps Field</div>
                    <div class="event-details">Blogger, Sophie, +15 others</div>
                </div>
                <div class="event-card invited">
                    <div class="event-title">Doggy Palooza</div>
                    <div class="event-details">🕒 7:30pm, Today | 📍 Tech Green</div>
                    <div class="event-details">Sierra, Natalie, Nivi, Abhi</div>
                </div>
            </div>
            
            <div class="create-event">Create Event</div>
        </div>
        
        <div class="bottom-nav">
            <div class="nav-item active"></div>
            <div class="nav-item"></div>
            <div class="nav-item"></div>
            <div class="nav-item"></div>
        </div>
    </div>
</body>
</html>
`;

const eventPagehtml1 = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Events</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }
        .phone-container {
            width: 375px;
            height: 812px;
            margin: 20px auto;
            background-color: white;
            border-radius: 40px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .content {
            padding: 20px;
        }
        h1 {
            color: #8B4513;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .profile-pic {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #ddd;
        }
        .section {
            margin-bottom: 20px;
        }
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .view-all {
            color: #8B4513;
            font-size: 0.9em;
        }
        .event-card {
            background-color: #FFE4B5;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 10px;
        }
        .event-card.attending {
            background-color: #E0FFFF;
        }
        .event-card.invited {
            background-color: #FFDAB9;
        }
        .event-title {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .event-details {
            font-size: 0.9em;
            color: #555;
        }
        .create-event {
            background-color: white;
            border: 2px solid #8B4513;
            color: #8B4513;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            margin-top: 20px;
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
        <div class="content">
            <h1>
                Your Events
                <div class="profile-pic"></div>
            </h1>
            
            <div class="section">
                <div class="section-header">
                    <h2>Your Events</h2>
                    <span class="view-all">View all</span>
                </div>
                <% events.forEach(event => { %>
                    <div class="event-card">
                        <div class="event-title"><%= event.title %></div>
                        <div class="event-details">🕒 <%= event.time %> | 📍 <%= event.location %></div>
                        <div class="event-details"><%= event.attendees.length %> Attendees</div>
                    </div>
                <% }) %>
            </div>
            
            <div class="section">
                <div class="section-header">
                    <h2>Attending</h2>
                    <span class="view-all">View all</span>
                </div>
                <div class="event-card attending">
                    <div class="event-title">Coffee chat abt internships</div>
                    <div class="event-details">🕒 7:30pm, Today | 📍 Kaldi's</div>
                    <div class="event-details">Maya</div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-header">
                    <h2>Invited</h2>
                    <span class="view-all">View all</span>
                </div>
                <div class="event-card invited">
                    <div class="event-title">Yap Sesh</div>
                    <div class="event-details">🕒 7:30pm, Today | 📍 NAV North 490</div>
                    <div class="event-details">Max, Sam, 2 others</div>
                </div>
                <div class="event-card invited">
                    <div class="event-title">Flag Football</div>
                    <div class="event-details">🕒 7:30pm, Today | 📍 Stamps Field</div>
                    <div class="event-details">Blogger, Sophie, +15 others</div>
                </div>
                <div class="event-card invited">
                    <div class="event-title">Doggy Palooza</div>
                    <div class="event-details">🕒 7:30pm, Today | 📍 Tech Green</div>
                    <div class="event-details">Sierra, Natalie, Nivi, Abhi</div>
                </div>
            </div>
            
            <div class="create-event">Create Event</div>
        </div>
        
        <div class="bottom-nav">
            <div class="nav-item active"></div>
            <div class="nav-item"></div>
            <div class="nav-item"></div>
            <div class="nav-item"></div>
        </div>
    </div>
</body>
</html>
`;

export {eventPagehtml};
export {eventPagehtml1};