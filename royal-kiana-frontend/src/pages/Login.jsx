import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authAPI } from '../utils/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: email, 2: code, 3: new password
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.requestPasswordReset(resetEmail);
      setResetMessage(response.data.message);
      setResetStep(2); // Move to code verification
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send reset code');
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setResetMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.verifyResetCode(resetEmail, resetCode);
      setResetMessage(response.data.message);
      setResetStep(3); // Move to new password
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid or expired code');
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.resetPassword(resetEmail, resetCode, newPassword);
      setResetMessage(response.data.message);
      setLoading(false);
      
      // Auto redirect to login after 2 seconds
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetStep(1);
        setResetEmail('');
        setResetCode('');
        setNewPassword('');
        setConfirmPassword('');
        setResetMessage('');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setResetStep(1);
    setResetEmail('');
    setResetCode('');
    setNewPassword('');
    setConfirmPassword('');
    setResetMessage('');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card-premium">
          {!showForgotPassword ? (
            <>
              <h2 className="text-3xl font-display font-bold text-center mb-2 text-gray-900 dark:text-white">Welcome Back</h2>
              <p className="text-gray-600 dark:text-white/60 text-center mb-8">Login to your account</p>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input-field"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <p className="text-center text-gray-600 dark:text-white/60 mt-6">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                  Sign up
                </Link>
              </p>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                  {resetStep === 1 && 'Forgot Password?'}
                  {resetStep === 2 && 'Enter Verification Code'}
                  {resetStep === 3 && 'Set New Password'}
                </h2>
                <p className="text-gray-600 dark:text-white/60">
                  {resetStep === 1 && 'Enter your email to receive a reset code'}
                  {resetStep === 2 && 'Check your email for the 6-digit code'}
                  {resetStep === 3 && 'Create a new password for your account'}
                </p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-6 space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${resetStep >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                  1
                </div>
                <div className={`w-12 h-0.5 ${resetStep >= 2 ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${resetStep >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                  2
                </div>
                <div className={`w-12 h-0.5 ${resetStep >= 3 ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${resetStep >= 3 ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                  3
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 flex items-start space-x-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {resetMessage && (
                <div className="bg-green-500/10 border border-green-500/50 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg mb-6 flex items-start space-x-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{resetMessage}</span>
                </div>
              )}

              {/* Step 1: Enter Email */}
              {resetStep === 1 && (
                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Email Address</label>
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Sending Code...' : 'Send Reset Code'}
                  </button>

                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="w-full btn-secondary"
                  >
                    Back to Login
                  </button>
                </form>
              )}

              {/* Step 2: Enter Verification Code */}
              {resetStep === 2 && (
                <form onSubmit={handleVerifyCode} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Verification Code</label>
                    <input
                      type="text"
                      required
                      maxLength="6"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ''))}
                      className="input-field text-center text-2xl tracking-widest"
                      placeholder="000000"
                    />
                    <p className="text-xs text-gray-500 dark:text-white/50 mt-2">
                      Enter the 6-digit code sent to {resetEmail}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || resetCode.length !== 6}
                    className="w-full btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Verify Code'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setResetStep(1)}
                    className="w-full btn-secondary"
                  >
                    Resend Code
                  </button>
                </form>
              )}

              {/* Step 3: Set New Password */}
              {resetStep === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="input-field"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Confirm Password</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-field"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Resetting Password...' : 'Reset Password'}
                  </button>

                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="w-full btn-secondary"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
