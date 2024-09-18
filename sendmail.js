const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = '356786464920-r69p3kduusebld4hbrb4l8o079h64t9t.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04N8-5QmNE0_oCgYIARAAGAQSNwF-L9IrJTjiNYCEYdTFUXV9J30OtfgtI6b-dkMHFY_IK9RMEX8QhR7yEySd563ohNi_oZPxKYQ';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'shabinh1345@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'PANTHER <shabinh1345@gmail.com>',
      to: 'shabinhussain6@gmail.com',
      subject: 'Hello from gmail using API',
      text: 'Hello from gmail email using API',
      html: '<h1>Hello from gmail email using API</h1>',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));