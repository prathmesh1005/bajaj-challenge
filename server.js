const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000; // Use dynamic port

app.use(express.json());

app.post('/bfhl', (req, res) => {
  const { numbers } = req.body;
  const USER_ID = 'yourname_ddmmyyyy';

  if (!Array.isArray(numbers)) {
    return res.status(400).json({ is_success: false, user_id: USER_ID });
  }

  const numericArray = numbers.map(Number);
  const odd = numericArray.filter(n => n % 2 !== 0);
  const even = numericArray.filter(n => n % 2 === 0);

  res.json({
    is_success: true,
    user_id: USER_ID,
    odd,
    even
  });
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1, user_id: 'yourname_ddmmyyyy' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
