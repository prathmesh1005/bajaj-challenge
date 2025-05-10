// server.js - Simplified version with custom user_id
const express = require('express');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// REPLACE THIS with your custom user_id following the format: firstname_lastname_dateofbirth
// Example: "jane_smith_05121995" for Jane Smith born on May 12, 1995
const USER_ID = "your_name_ddmmyyyy"; 

// Middleware to parse JSON requests
app.use(express.json());

// Main route handler for /bfhl endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { numbers } = req.body;
    
    // Validate input
    if (!numbers || !Array.isArray(numbers)) {
      return res.status(400).json({
        is_success: false,
        user_id: USER_ID
      });
    }
    
    // Check if array contains only numeric values
    const isAllNumeric = numbers.every(item => !isNaN(Number(item)));
    
    if (!isAllNumeric) {
      return res.json({
        is_success: false,
        user_id: USER_ID
      });
    }
    
    // Convert all elements to numbers for proper processing
    const numericArray = numbers.map(item => Number(item));
    
    // Separate odd and even numbers
    const oddNumbers = numericArray.filter(num => num % 2 !== 0);
    const evenNumbers = numericArray.filter(num => num % 2 === 0);
    
    return res.json({
      is_success: true,
      user_id: USER_ID,
      odd: oddNumbers,
      even: evenNumbers
    });
  } catch (error) {
    console.error('Error processing numbers:', error);
    return res.status(500).json({
      is_success: false,
      user_id: USER_ID
    });
  }
});

// Optional: GET endpoint for testing if API is online
app.get('/bfhl', (req, res) => {
  res.json({
    operation_code: 1,
    user_id: USER_ID
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});