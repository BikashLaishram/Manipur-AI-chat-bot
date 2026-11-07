/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppNavigationTab, SupportedLanguage, UserProfile } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../data/manipurKnowledge';
import {
  Sparkles,
  PhoneCall,
  User,
  Shield,
  Layers,
  Smartphone,
  Globe,
  Database
} from 'lucide-react';

interface NavbarProps {
  activeTab: AppNavigationTab;
  onTabChange: (tab: AppNavigationTab) => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onOpenVoiceCall: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  currentLanguage,
  onLanguageChange,
  currentUser,
  onOpenAuth,
  onOpenVoiceCall,
}) => {
  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onTabChange('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-wider text-white">
                MANIPUR<span className="text-cyan-400">.AI</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-950/80 text-purple-300 border border-purple-800/50 font-mono">
                PROD
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block font-serif">
              Your State. Your Language. Your AI.
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-300">
          <button
            onClick={() => onTabChange('home')}
            className={`px-3 py-2 rounded-xl transition-all ${
              activeTab === 'home'
                ? 'bg-slate-800 text-white font-bold'
                : 'hover:text-cyan-300 hover:bg-slate-900/60'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onTabChange('chat')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                : 'hover:text-cyan-300 hover:bg-slate-900/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI Assistant
          </button>
          <button
            onClick={() => onTabChange('knowledge')}
            className={`px-3 py-2 rounded-xl transition-all ${
              activeTab === 'knowledge'
                ? 'bg-slate-800 text-white font-bold'
                : 'hover:text-cyan-300 hover:bg-slate-900/60'
            }`}
          >
            Knowledge Base
          </button>
          <button
            onClick={() => onTabChange('tourism-3d')}
            className={`px-3 py-2 rounded-xl transition-all ${
              activeTab === 'tourism-3d'
                ? 'bg-slate-800 text-white font-bold'
                : 'hover:text-cyan-300 hover:bg-slate-900/60'
            }`}
          >
            3D Map & Tourism
          </button>
          <button
            onClick={() => onTabChange('translator')}
            className={`px-3 py-2 rounded-xl transition-all ${
              activeTab === 'translator'
                ? 'bg-slate-800 text-white font-bold'
                : 'hover:text-cyan-300 hover:bg-slate-900/60'
            }`}
          >
            Meiteilon Translator
          </button>
          <button
            onClick={() => onTabChange('mobile-app')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1 ${
              activeTab === 'mobile-app'
                ? 'bg-slate-800 text-emerald-400 font-bold'
                : 'hover:text-emerald-300 hover:bg-slate-900/60'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile App
          </button>
          <button
            onClick={() => onTabChange('admin')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1 ${
              activeTab === 'admin'
                ? 'bg-slate-800 text-purple-300 font-bold'
                : 'hover:text-purple-300 hover:bg-slate-900/60'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> Admin & SQL
          </button>
        </div>

        {/* Right Action Tools: Language Selector, Voice Call, Auth */}
        <div className="flex items-center gap-2">
          {/* Voice Calling Button */}
          <button
            onClick={onOpenVoiceCall}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-700/60 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            title="Launch Hologram Voice Call"
          >
            <PhoneCall className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span className="hidden sm:inline">Voice Call</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              className="bg-slate-900/90 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-medium cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* User Auth Profile Button */}
          {currentUser ? (
            <div
              onClick={onOpenAuth}
              className="flex items-center gap-2 pl-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shadow-sm">
                {currentUser.name.slice(0, 2).toUpperCase()}
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around py-2 px-2 border-t border-slate-800/60 bg-slate-950/60 text-[11px] font-medium text-slate-400 overflow-x-auto scrollbar-none">
        <button
          onClick={() => onTabChange('home')}
          className={activeTab === 'home' ? 'text-cyan-400 font-bold' : ''}
        >
          Home
        </button>
        <button
          onClick={() => onTabChange('chat')}
          className={activeTab === 'chat' ? 'text-cyan-400 font-bold' : ''}
        >
          AI Chat
        </button>
        <button
          onClick={() => onTabChange('knowledge')}
          className={activeTab === 'knowledge' ? 'text-cyan-400 font-bold' : ''}
        >
          Knowledge
        </button>
        <button
          onClick={() => onTabChange('tourism-3d')}
          className={activeTab === 'tourism-3d' ? 'text-cyan-400 font-bold' : ''}
        >
          3D Map
        </button>
        <button
          onClick={() => onTabChange('translator')}
          className={activeTab === 'translator' ? 'text-cyan-400 font-bold' : ''}
        >
          Translator
        </button>
        <button
          onClick={() => onTabChange('mobile-app')}
          className={activeTab === 'mobile-app' ? 'text-cyan-400 font-bold' : ''}
        >
          App
        </button>
        <button
          onClick={() => onTabChange('admin')}
          className={activeTab === 'admin' ? 'text-purple-400 font-bold' : ''}
        >
          Admin
        </button>
      </div>
    </nav>
  );
};
