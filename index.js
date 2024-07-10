const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const prisma = new PrismaClient();
app.use(bodyParser.json());
app.use(cors()); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const sendReferralEmail = async (referrerName, referrerEmail, refereeName, refereeEmail, message) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: refereeEmail,
      subject: 'Exclusive Invitation: Join Accredian with Bonus Benefits!',
      text: `Hi ${refereeName},\n\nYou have been specially referred by ${referrerName} (${referrerEmail}) to join the Accredian community. At Accredian, we empower professionals with top-notch programs designed to elevate your career.\n\n${referrerName} shared the following message with you:\n"${message}"\n\nAs a valued referral, you are eligible for exclusive bonuses when you join using the link below. Don't miss this opportunity to enhance your skills and achieve your career goals with Accredian!\n\nJoin now: https://accredian.com/\n\nBest regards,\nThe Accredian Team\n\nP.S. This referral link offers special bonuses just for you. Act now to take full advantage of this exclusive offer!`,
    };
  
    await transporter.sendMail(mailOptions);
  };
  


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  return res.send('Server Is Running');
});

app.post('/referral', async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail, message } = req.body;

  if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
  
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        message,
      },
    });

    
    await sendReferralEmail(referrerName, referrerEmail, refereeName, refereeEmail, message);

    res.status(201).json(referral);
  } catch (error) {
    console.error('Error creating referral:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
