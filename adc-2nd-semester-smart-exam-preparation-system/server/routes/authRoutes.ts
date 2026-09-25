import { Router } from 'express';
import { db } from '../db.js';
import { hashPassword, verifyPassword, generateToken, requireAuth, type AuthRequest } from '../auth.js';

export const authRouter = Router();

// Register new user
authRouter.post('/register', (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: 'Name, email, and password are required.' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters long.' });
      return;
    }

    if (confirmPassword && password !== confirmPassword) {
      res.status(400).json({ error: 'Passwords do not match.' });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
    if (existing) {
      res.status(400).json({ error: 'An account with this email already exists.' });
      return;
    }

    const userId = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const passwordHash = hashPassword(password);

    db.prepare(`
      INSERT INTO users (id, name, email, password_hash, role)
      VALUES (?, ?, ?, ?, 'student')
    `).run(userId, name.trim(), cleanEmail, passwordHash);

    // Initial notification
    db.prepare(`
      INSERT INTO notifications (id, user_id, title, message)
      VALUES (?, ?, ?, ?)
    `).run(
      `notif-${Date.now()}`,
      userId,
      'Welcome to ADC 2nd Semester Prep!',
      'Your account is ready. Begin by setting up your study plan or practicing MCQs for any of the 6 core subjects.'
    );

    const token = generateToken({
      id: userId,
      name: name.trim(),
      email: cleanEmail,
      role: 'student'
    });

    res.status(201).json({
      message: 'Account registered successfully.',
      token,
      user: {
        id: userId,
        name: name.trim(),
        email: cleanEmail,
        role: 'student'
      }
    });
  } catch (err: unknown) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to create account. Please try again.' });
  }
});

// Login
authRouter.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Please provide both email and password.' });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = db.prepare('SELECT id, name, email, password_hash, role FROM users WHERE email = ?').get(cleanEmail) as {
      id: string;
      name: string;
      email: string;
      password_hash: string;
      role: 'student' | 'admin';
    } | undefined;

    if (!user || !verifyPassword(password, user.password_hash)) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    res.json({
      message: 'Logged in successfully.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err: unknown) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// Current User Profile
authRouter.get('/me', requireAuth, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

// Forgot Password
authRouter.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: 'Please provide an email address.' });
    return;
  }
  // In demo/production, acknowledge reset request securely
  res.json({
    message: 'If an account exists with this email, password reset instructions have been generated.'
  });
});

// Reset Password
authRouter.post('/reset-password', (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword || newPassword.length < 6) {
    res.status(400).json({ error: 'Valid email and new password (min 6 chars) required.' });
    return;
  }

  const cleanEmail = email.trim().toLowerCase();
  const user = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  const newHash = hashPassword(newPassword);
  db.prepare('UPDATE users SET password_hash = ?, updated_at = datetime(\'now\') WHERE email = ?').run(newHash, cleanEmail);

  res.json({ message: 'Password has been reset successfully. Please log in.' });
});
