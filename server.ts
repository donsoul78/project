import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
const PORT = 3000;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});





// Sign Up
app.post('/signup', async (req, res) => {
    console.log("signup received");

    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
         res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    let exists = false;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        exists = true;
         res.status(400).json({ message: 'User already exists.' });
    }

    if(!exists){
    // Create user
    const user = await prisma.user.create({
        data: {
            email: email,
            password: password, // Use hashed password
            name: name,
        },
    });
    res.status(201).json({ message: 'User created successfully!', user });
    }

    
});

// Login
// Login
app.post('/login', async (req, res) => {
    try {
        console.log("login received");

        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
             res.status(400).json({ message: 'Email and password are required.' });
            return;
            }

        // Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // Find user
        const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });
        if (!user) {
             res.status(401).json({ message: 'Invalid email or password.' });
                return;
            }

        // Verify password
        if (password !== user.password) { // Compare plain text passwords
             res.status(401).json({ message: 'Invalid email or password.' });
            return;
            }

        
        // Send response with token
        res.status(201).json({ message: 'log in is good.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});




