export default function handler(req, res) {
  const USER_ID = "your_name_ddmmyyyy";

  if (req.method === 'POST') {
    const { numbers } = req.body;

    if (!Array.isArray(numbers)) {
      return res.status(400).json({ is_success: false, user_id: USER_ID });
    }

    const numericArray = numbers.map(Number);
    const isAllNumeric = numericArray.every(n => !isNaN(n));

    if (!isAllNumeric) {
      return res.json({ is_success: false, user_id: USER_ID });
    }

    const odd = numericArray.filter(n => n % 2 !== 0);
    const even = numericArray.filter(n => n % 2 === 0);

    return res.json({
      is_success: true,
      user_id: USER_ID,
      odd,
      even
    });
  }

  if (req.method === 'GET') {
    return res.json({
      operation_code: 1,
      user_id: USER_ID
    });
  }

  res.status(405).end(); // Method Not Allowed
}
