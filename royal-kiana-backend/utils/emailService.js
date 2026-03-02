const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send password reset code email
const sendPasswordResetEmail = async (email, resetCode, userName = 'User') => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `Royal Kiana Hotel <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Code - Royal Kiana Hotel',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .code-box {
              background: white;
              border: 2px dashed #f97316;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
              border-radius: 8px;
            }
            .code {
              font-size: 36px;
              font-weight: bold;
              color: #f97316;
              letter-spacing: 8px;
              font-family: 'Courier New', monospace;
            }
            .warning {
              background: #fef3c7;
              border-left: 4px solid #f59e0b;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 14px;
            }
            .button {
              display: inline-block;
              background: #f97316;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 6px;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0;">🏨 Royal Kiana Hotel</h1>
            <p style="margin: 10px 0 0 0;">Password Reset Request</p>
          </div>
          
          <div class="content">
            <p>Hello <strong>${userName}</strong>,</p>
            
            <p>We received a request to reset your password for your Royal Kiana Hotel account.</p>
            
            <p>Your verification code is:</p>
            
            <div class="code-box">
              <div class="code">${resetCode}</div>
              <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">Enter this code to reset your password</p>
            </div>
            
            <div class="warning">
              <strong>⚠️ Important:</strong>
              <ul style="margin: 10px 0;">
                <li>This code will expire in <strong>10 minutes</strong></li>
                <li>You have <strong>3 attempts</strong> to enter the correct code</li>
                <li>Do not share this code with anyone</li>
              </ul>
            </div>
            
            <p>If you didn't request this password reset, please ignore this email or contact our support team if you have concerns.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #6b7280; font-size: 14px;">Need help?</p>
              <p style="margin: 5px 0;">📞 <strong>07070279453</strong></p>
              <p style="margin: 5px 0;">✉️ <strong>adejiboladc24@gmail.com</strong></p>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Royal Kiana Hotel</strong></p>
            <p>12, Olayinka Olugoke Str, Idmu Pipeline, Lagos, Nigeria</p>
            <p style="margin-top: 15px; font-size: 12px;">
              This is an automated email. Please do not reply to this message.
            </p>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent successfully to:', email);
    console.log('Message ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    throw error;
  }
};

// Send booking confirmation email
const sendBookingConfirmationEmail = async (email, bookingDetails) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `Royal Kiana Hotel <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Booking Confirmation - ${bookingDetails.bookingId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .booking-details {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0;">🏨 Royal Kiana Hotel</h1>
            <p style="margin: 10px 0 0 0;">Booking Confirmation</p>
          </div>
          
          <div class="content">
            <p>Dear <strong>${bookingDetails.guestName}</strong>,</p>
            
            <p>Thank you for choosing Royal Kiana Hotel! Your booking has been confirmed.</p>
            
            <div class="booking-details">
              <h3 style="margin-top: 0; color: #f97316;">Booking Details</h3>
              <div class="detail-row">
                <span><strong>Booking ID:</strong></span>
                <span>${bookingDetails.bookingId}</span>
              </div>
              <div class="detail-row">
                <span><strong>Room Type:</strong></span>
                <span>${bookingDetails.roomType}</span>
              </div>
              <div class="detail-row">
                <span><strong>Check-in:</strong></span>
                <span>${bookingDetails.checkIn}</span>
              </div>
              <div class="detail-row">
                <span><strong>Check-out:</strong></span>
                <span>${bookingDetails.checkOut}</span>
              </div>
              <div class="detail-row">
                <span><strong>Guests:</strong></span>
                <span>${bookingDetails.guests}</span>
              </div>
              <div class="detail-row" style="border-bottom: none;">
                <span><strong>Total Amount:</strong></span>
                <span style="color: #f97316; font-size: 18px; font-weight: bold;">₦${bookingDetails.totalPrice.toLocaleString()}</span>
              </div>
            </div>
            
            <p>We look forward to welcoming you!</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #6b7280; font-size: 14px;">Questions? Contact us:</p>
              <p style="margin: 5px 0;">📞 <strong>07070279453</strong></p>
              <p style="margin: 5px 0;">✉️ <strong>adejiboladc24@gmail.com</strong></p>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Royal Kiana Hotel</strong></p>
            <p>12, Olayinka Olugoke Str, Idmu Pipeline, Lagos, Nigeria</p>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Booking confirmation email sent to:', email);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending booking confirmation email:', error);
    throw error;
  }
};

module.exports = {
  sendPasswordResetEmail,
  sendBookingConfirmationEmail
};
