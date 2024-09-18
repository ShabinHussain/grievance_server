// /services/emailService.js

const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Load environment variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'; // Adjust as needed
const USER_EMAIL = process.env.USER_EMAIL; // Your Gmail address
const USER_PASSWORD = process.env.USER_PASSWORD; // Your Gmail password

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(to, subject, text, html) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: USER_EMAIL,
        pass: USER_PASSWORD,
       // type: 'OAuth2',
      //  user: 'shabinh1345@gmail.com', // Replace with your Gmail address}
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: 'Panther <shabinh1345@gmail.com>', // Replace with your Gmail address
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = { sendMail };
