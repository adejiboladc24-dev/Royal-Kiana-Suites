const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Contact routes working!' });
});

// Contact form submission
router.post('/send', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Email to hotel
    const hotelEmailOptions = {
      from: process.env.EMAIL_USER,
      to: 'adejiboladc24@gmail.com',
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">📧 New Contact Message</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; margin-top: 0;">Contact Details</h2>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #f3f4f6; border-left: 4px solid #667eea; border-radius: 5px;">
              <p style="margin: 5px 0; color: #4b5563;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0; color: #4b5563;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea;">${email}</a></p>
              <p style="margin: 5px 0; color: #4b5563;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #667eea;">${phone}</a></p>
            </div>
            
            <h3 style="color: #1f2937; margin-top: 25px;">Message:</h3>
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="color: #374151; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
              <h3 style="color: #1f2937; margin-bottom: 15px;">Quick Actions:</h3>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="mailto:${email}" style="display: inline-block; padding: 12px 24px; background-color: #667eea; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Reply via Email</a>
                <a href="tel:${phone}" style="display: inline-block; padding: 12px 24px; background-color: #10b981; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Call Customer</a>
                <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="display: inline-block; padding: 12px 24px; background-color: #25D366; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">WhatsApp</a>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>Royal Kiana Suites - Contact Form Notification</p>
            <p>Received: ${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}</p>
          </div>
        </div>
      `
    };

    // Confirmation email to customer
    const customerEmailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Royal Kiana Suites',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">👑 Royal Kiana Suites</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937;">Hello ${name},</h2>
            
            <p style="color: #4b5563; line-height: 1.6;">Thank you for reaching out to Royal Kiana Suites! We have received your message and our team will get back to you within 24 hours.</p>
            
            <div style="margin: 25px 0; padding: 20px; background-color: #f3f4f6; border-left: 4px solid #667eea; border-radius: 5px;">
              <h3 style="color: #1f2937; margin-top: 0;">Your Message:</h3>
              <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Need Immediate Assistance?</h3>
              <p style="color: #4b5563; margin-bottom: 15px;">Contact us directly:</p>
              <p style="margin: 8px 0;"><strong>📞 Phone:</strong> <a href="tel:07070279453" style="color: #667eea;">07070279453</a></p>
              <p style="margin: 8px 0;"><strong>📧 Email:</strong> <a href="mailto:adejiboladc24@gmail.com" style="color: #667eea;">adejiboladc24@gmail.com</a></p>
              <p style="margin: 8px 0;"><strong>💬 WhatsApp:</strong> <a href="https://wa.me/2347070279453" style="color: #667eea;">Chat with us</a></p>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 25px;">
              Best regards,<br>
              <strong style="color: #1f2937;">Royal Kiana Suites Team</strong><br>
              12, Olayinka Olugoke Str, Idmu Pipeline, Lagos
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Royal Kiana Suites. All rights reserved.</p>
          </div>
        </div>
      `
    };

    // Send both emails
    await transporter.sendMail(hotelEmailOptions);
    await transporter.sendMail(customerEmailOptions);

    console.log(`✅ Contact form message sent from: ${email}`);

    res.status(200).json({ 
      message: 'Message sent successfully! We will get back to you soon.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again or contact us directly.' });
  }
});

module.exports = router;
