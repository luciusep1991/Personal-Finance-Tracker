// Import necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const financeTracker = require('./financeTracker');

// Initialize the Express app
const app = express();
const port = 3000;

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Define routes
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Authenticate user
        const user = await financeTracker.authenticateUser(username, password);
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        // Register new user
        const newUser = await financeTracker.registerUser(username, password, email);
        res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/expenses', async (req, res) => {
    try {
        const { userId } = req.query;
        // Fetch expenses for user
        const expenses = await financeTracker.getExpenses(userId);
        res.json({ expenses });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/expenses', async (req, res) => {
    try {
        const { userId, category, amount, date } = req.body;
        // Add new expense
        const newExpense = await financeTracker.addExpense(userId, category, amount, date);
        res.status(201).json({ message: 'Expense added successfully', newExpense });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
