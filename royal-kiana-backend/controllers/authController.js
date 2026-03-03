const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { validateEmail, validatePassword, validateName } = require('../utils/validators');
const { sendPasswordResetEmail } = require('../utils/emailService');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validateName(name)) {
      return res.status(400).json({ error: 'Name must be at least 2 characters' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(name, email, hashedPassword);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role || 'customer' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role || 'customer'
      },
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error during signup' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role || 'customer' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'customer'
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

// Store reset codes temporarily (in production, use Redis or database)
const resetCodes = new Map();

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !validateEmail(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists for security
      return res.status(200).json({ 
        message: 'If an account exists with this email, a reset code has been sent.' 
      });
    }

    // Generate 6-digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store code with expiration (10 minutes)
    resetCodes.set(email, {
      code: resetCode,
      expires: Date.now() + 10 * 60 * 1000,
      attempts: 0
    });

    // Log email credentials status
    console.log('📧 Email Configuration Check:');
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Missing');
    console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✅ Set' : '❌ Missing');

    // Send email with reset code
    try {
      await sendPasswordResetEmail(email, resetCode, user.name);
      console.log(`✅ Password reset code sent to: ${email}`);
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError.message);
      
      // TEMPORARY: Show code in console for testing
      console.log('\n========================================');
      console.log('⚠️  EMAIL FAILED - TEMPORARY CODE DISPLAY');
      console.log(`PASSWORD RESET CODE FOR: ${email}`);
      console.log(`CODE: ${resetCode}`);
      console.log('Valid for 10 minutes');
      console.log('========================================\n');
      
      // Still return success so user can use the code from console
      return res.status(200).json({ 
        message: 'Reset code generated. Check server console for code (email service temporarily unavailable).'
      });
    }

    res.status(200).json({ 
      message: 'Reset code sent to your email. Please check your inbox.'
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and code are required' });
    }

    const resetData = resetCodes.get(email);
    
    if (!resetData) {
      return res.status(400).json({ error: 'No reset request found for this email' });
    }

    if (Date.now() > resetData.expires) {
      resetCodes.delete(email);
      return res.status(400).json({ error: 'Reset code has expired' });
    }

    if (resetData.attempts >= 3) {
      resetCodes.delete(email);
      return res.status(400).json({ error: 'Too many failed attempts. Please request a new code.' });
    }

    if (resetData.code !== code) {
      resetData.attempts++;
      return res.status(400).json({ error: 'Invalid reset code' });
    }

    // Code is valid, mark as verified
    resetData.verified = true;
    
    res.status(200).json({ 
      message: 'Code verified successfully',
      verified: true
    });
  } catch (error) {
    console.error('Verify reset code error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ error: 'Email, code, and new password are required' });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const resetData = resetCodes.get(email);
    
    if (!resetData || !resetData.verified) {
      return res.status(400).json({ error: 'Invalid or unverified reset request' });
    }

    if (Date.now() > resetData.expires) {
      resetCodes.delete(email);
      return res.status(400).json({ error: 'Reset code has expired' });
    }

    if (resetData.code !== code) {
      return res.status(400).json({ error: 'Invalid reset code' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updatePassword(user.id, hashedPassword);

    // Clear reset code
    resetCodes.delete(email);

    res.status(200).json({ 
      message: 'Password reset successfully. You can now login with your new password.' 
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Staff login with hardcoded credentials
exports.staffLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Hardcoded staff credentials
    if (username === 'staff' && password === 'royal2026') {
      const token = jwt.sign(
        { id: 'staff-user', email: 'staff@royalkiana.com', role: 'staff' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(200).json({
        message: 'Staff login successful',
        user: {
          id: 'staff-user',
          name: 'Staff User',
          email: 'staff@royalkiana.com',
          role: 'staff'
        },
        token
      });
    } else {
      res.status(401).json({ error: 'Invalid staff credentials' });
    }
  } catch (error) {
    console.error('Staff login error:', error);
    res.status(500).json({ error: 'Server error during staff login' });
  }
};
