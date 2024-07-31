import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Confirm your email',
		html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .container {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
      text-align: center;
    }
    .header {
      font-size: 24px;
      margin-bottom: 20px;
      color: #333;
    }
    .message {
      font-size: 16px;
      margin-bottom: 20px;
      color: #666;
    }
    .button {
      display: inline-block;
      background-color: #007bff;
      color: #fff;
      padding: 10px 20px;
      border-radius: 4px;
      text-decoration: none;
      font-size: 16px;
    }
    .button:hover {
      background-color: #0056b3;
	color: #fff;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #aaa;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Email Verification</div>
    <div class="message">Please verify your email address by clicking the button below:</div>
    <a href=${confirmLink} class="button">Verify Email</a>
    <div class="footer">If you did not create an account, please ignore this email.</div>
  </div>
</body>
</html>
`,
	});
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Reset your password',
		html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .container {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
      text-align: center;
    }
    .header {
      font-size: 24px;
      margin-bottom: 20px;
      color: #333;
    }
    .message {
      font-size: 16px;
      margin-bottom: 20px;
      color: #666;
    }
    .button {
      display: inline-block;
      background-color: #007bff;
      color: #fff;
      padding: 10px 20px;
      border-radius: 4px;
      text-decoration: none;
      font-size: 16px;
    }
    .button:hover {
      background-color: #0056b3;
	color: #fff;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #aaa;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Email Verification</div>
    <div class="message">Please verify your email address by clicking the button below:</div>
    <a href=${resetLink} class="button">Reset your password</a>
    <div class="footer">If you did not create an account, please ignore this email.</div>
  </div>
</body>
</html>
`,
	});
};
