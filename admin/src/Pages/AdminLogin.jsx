import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Lock, Mail, Eye, EyeOff, ShieldAlert, KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { 
  loginAdminInit, 
  verifyLoginOtp, 
  forgotPasswordAdmin, 
  resetPasswordAdmin, 
  clearAuthError, 
  clearAuthMessage,
  resetMfaState 
} from '../Store/adminAuthStore';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loading: isLoading, error, mfaRequired, otpSent, message } = useSelector((state) => state.adminAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // flow can be: 'login', 'mfa', 'forgot', 'reset'
  const [flow, setFlow] = useState('login');

  useEffect(() => {
    if (mfaRequired) {
      setFlow('mfa');
    }
  }, [mfaRequired]);

  useEffect(() => {
    if (otpSent) {
      setFlow('reset');
    }
  }, [otpSent]);

  const handleBackToLogin = () => {
    dispatch(clearAuthError());
    dispatch(clearAuthMessage());
    dispatch(resetMfaState());
    setFlow('login');
    setOtp('');
    setPassword('');
    setNewPassword('');
  };

  const handleClearError = () => {
    dispatch(clearAuthError());
  };

  const handleClearMessage = () => {
    dispatch(clearAuthMessage());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearAuthError());
    dispatch(clearAuthMessage());
    
    if (flow === 'login') {
      await dispatch(loginAdminInit({ email, password }));
    } else if (flow === 'mfa') {
      const resultAction = await dispatch(verifyLoginOtp({ email, otp }));
      if (verifyLoginOtp.fulfilled.match(resultAction)) {
        navigate('/admin/dashboard');
      }
    } else if (flow === 'forgot') {
      await dispatch(forgotPasswordAdmin(email));
    } else if (flow === 'reset') {
      const resultAction = await dispatch(resetPasswordAdmin({ email, otp, newPassword }));
      if (resetPasswordAdmin.fulfilled.match(resultAction)) {
        setFlow('login');
        setPassword('');
        setOtp('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-100 font-sans selection:bg-emerald-500/30 relative overflow-hidden">
      
      {/* Background Glow Decorative Layers */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container Card Structure */}
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-8 relative z-10 shadow-2xl animate-[scaleUp_0.25s_ease-out]">
        
        {/* Header Block Branding */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 shadow-inner">
            <Lock className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">
            {flow === 'login' && 'Control Center Access'}
            {flow === 'mfa' && 'Multi-Factor Validation'}
            {flow === 'forgot' && 'Key Recovery System'}
            {flow === 'reset' && 'Authorize Password Override'}
          </h2>
          <p className="text-xs text-slate-500 max-w-[280px] mx-auto">
            {flow === 'login' && 'Provide credentials to start admin authentication.'}
            {flow === 'mfa' && 'Enter the 6-digit OTP code sent to your email to verify identity.'}
            {flow === 'forgot' && 'Send a secure recovery key token link to your registered email.'}
            {flow === 'reset' && 'Provide OTP token along with your new password to reset.'}
          </p>
        </div>

        {/* Store Error Broadcast Notification Box */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 animate-[fadeIn_0.2s_ease-out]">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs font-medium text-rose-300 leading-normal">
              {error}
              <button 
                onClick={handleClearError}
                className="block mt-1 text-[10px] text-rose-400 underline hover:text-rose-300 transition-colors"
              >
                Dismiss alert
              </button>
            </div>
          </div>
        )}

        {/* Success Message Broadcast Box */}
        {message && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 animate-[fadeIn_0.2s_ease-out]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs font-medium text-emerald-300 leading-normal">
              {message}
              <button 
                onClick={handleClearMessage}
                className="block mt-1 text-[10px] text-emerald-400 underline hover:text-emerald-300 transition-colors"
              >
                Dismiss notification
              </button>
            </div>
          </div>
        )}

        {/* Input Form Layer */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {flow === 'login' && (
            <>
              {/* Email input field block */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 tracking-wide uppercase">
                  Admin Identity Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="anubhawgupta664@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 placeholder-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password input field block */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold text-slate-400 tracking-wide uppercase">
                    Secure Key Phrase
                  </label>
                  <button
                    type="button"
                    onClick={() => setFlow('forgot')}
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Forgot key phrase?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-11 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 placeholder-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </>
          )}

          {flow === 'mfa' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 tracking-wide uppercase">
                  Validation OTP Token
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 placeholder-slate-700 font-mono tracking-[0.3em] text-center focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {flow === 'forgot' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 tracking-wide uppercase">
                  Registered Identity Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="anubhawgupta664@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {flow === 'reset' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 tracking-wide uppercase">
                  Verification OTP Token
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="6-digit token"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 font-mono tracking-wider focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 tracking-wide uppercase">
                  New Secret Key Phrase
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="At least 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-11 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {flow === 'login' && 'Verify Access Authority'}
                {flow === 'mfa' && 'Authorize Session'}
                {flow === 'forgot' && 'Request Reset OTP'}
                {flow === 'reset' && 'Reset Secret Phrase'}
              </>
            )}
          </button>

          {/* Navigation/Back controls */}
          {flow !== 'login' && (
            <button
              type="button"
              onClick={handleBackToLogin}
              className="w-full py-1 text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </button>
          )}

        </form>

        {/* Local Sandboxed Credential Reference Tooltip Notice Footer */}
        {flow === 'login' && (
          <div className="mt-6 pt-5 border-t border-slate-800/60 text-center">
            <p className="text-[10px] text-slate-600">
              Admin Gateway: <code className="text-slate-500 px-1 py-0.5 rounded bg-slate-950 font-mono">anubhawgupta664@gmail.com</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;