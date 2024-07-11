const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const { MailtrapClient } = require('mailtrap');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Configure the Mailtrap client
const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = 'https://send.api.mailtrap.io/';
const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: 'email@example.com',
  name: 'Accredian Team',
};

// Define the send referral email function
const sendReferralEmail = async (referrerName, referrerEmail, refereeName, refereeEmail, message) => {
  const recipients = [{ email: refereeEmail }];

  try {
    await client.send({
      from: sender,
      to: recipients,
      subject: 'Exclusive Invitation: Join Accredian with Bonus Benefits!',
      text: `Hi ${refereeName},\n\nYou have been specially referred by ${referrerName} (${referrerEmail}) to join the Accredian community. At Accredian, we empower professionals with top-notch programs designed to elevate your career.\n\n${referrerName} shared the following message with you:\n"${message}"\n\nAs a valued referral, you are eligible for exclusive bonuses when you join using the link below. Don't miss this opportunity to enhance your skills and achieve your career goals with Accredian!\n\nJoin now: https://accredian.com/\n\nBest regards,\nThe Accredian Team\n\nP.S. This referral link offers special bonuses just for you. Act now to take full advantage of this exclusive offer!`,
      category: 'Referral',
    });
    console.log('Referral email sent successfully');
  } catch (error) {
    console.error('Error sending referral email:', error);
    throw new Error('Failed to send referral email');
  }
};

// Define your endpoints here

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
    // Create a new referral record
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        message,
      },
    });

    // Send the referral email
    try {
      await sendReferralEmail(referrerName, referrerEmail, refereeName, refereeEmail, message);
      res.status(201).json(referral);
    } catch (emailError) {
      // Email sending failed, delete the created referral record
      await prisma.referral.delete({ where: { id: referral.id } });
      res.status(500).json({ error: 'Referral created but failed to send email' });
    }
  } catch (error) {
    console.error('Error creating referral:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
