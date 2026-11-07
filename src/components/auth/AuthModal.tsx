/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserProfile, SupportedLanguage } from '../../types';
import { X, Lock, Mail, User, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'citizen' | 'student' | 'researcher' | 'tourist' | 'admin'>('citizen');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    const mockUser: UserProfile = {
      id: `u-${Date.now()}`,
      name: fullName || (email.split('@')[0]),
      email,
      role: email.includes('admin') ? 'admin' : role,
      preferredLanguage: 'en',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('manipur_ai_current_user', JSON.stringify(mockUser));
    onLoginSuccess(mockUser);
    onClose();
  };

  const handleDemoLogin = (roleType: 'citizen' | 'admin' | 'tourist') => {
    const demoUser: UserProfile = {
      id: `u-${roleType}`,
      name: roleType === 'admin' ? 'Bikash Laishram (Admin)' : roleType === 'tourist' ? 'Elena Vance (Visitor)' : 'Linthoi Devi (Citizen)',
      email: `${roleType}@manipur.gov.in`,
      role: roleType,
      preferredLanguage: roleType === 'tourist' ? 'en' : 'mni',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('manipur_ai_current_user', JSON.stringify(demoUser));
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-2xl space-y-5 animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex p-2 rounded-2xl bg-purple-600/20 border border-purple-500/40 text-cyan-400 mb-1">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-white">
            {mode === 'login' ? 'Welcome Back to MANIPUR AI' : 'Join MANIPUR AI Platform'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login'
              ? 'Access personalized knowledge, chat history & state services'
              : 'Create an account to save sessions and access citizen services'}
          </p>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'login' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'signup' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-300">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Linthoingambi Devi"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-300">Primary Identity</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="citizen">Manipur Citizen / Resident</option>
                <option value="student">Student / Exam Aspirant</option>
                <option value="tourist">Tourist / Traveler</option>
                <option value="researcher">Researcher / Historian</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all"
          >
            {mode === 'login' ? 'Sign In Securely' : 'Complete Registration'}
          </button>
        </form>

        {/* Quick Demo Login Shortcuts */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <span className="text-[10px] text-slate-400 block text-center font-mono">
            QUICK ONE-CLICK DEMO ACCESS:
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => handleDemoLogin('citizen')}
              className="py-1 px-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-medium text-slate-300 hover:text-cyan-300 hover:border-slate-700"
            >
              Citizen Mode
            </button>
            <button
              onClick={() => handleDemoLogin('tourist')}
              className="py-1 px-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-medium text-slate-300 hover:text-cyan-300 hover:border-slate-700"
            >
              Tourist Mode
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              className="py-1 px-2 rounded-lg bg-purple-950/70 border border-purple-800/60 text-[10px] font-bold text-purple-300 hover:text-white"
            >
              Admin Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
