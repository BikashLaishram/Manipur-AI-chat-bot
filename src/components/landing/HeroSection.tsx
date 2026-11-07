/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HologramAvatar } from '../3d/HologramAvatar';
import { AvatarState, AppNavigationTab } from '../../types';
import { Sparkles, MessageSquare, Compass, ArrowRight, ShieldCheck, Languages, PhoneCall } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tab: AppNavigationTab) => void;
  onAskPrompt: (prompt: string) => void;
  avatarState: AvatarState;
  onAvatarStateChange: (state: AvatarState) => void;
  onOpenVoiceCall: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onAskPrompt,
  avatarState,
  onAvatarStateChange,
  onOpenVoiceCall,
}) => {
  const quickPrompts = [
    'Tell me about Loktak Lake and its floating Phumdis',
    'How do I apply for the CMHT health scheme?',
    'What is the history of Kangla Fort and King Pakhangba?',
    'Teach me 5 useful phrases in Meiteilon',
  ];

  return (
    <section className="relative w-full min-h-[640px] pt-6 pb-12 flex flex-col justify-center overflow-hidden">
      {/* Background Glowing Mesh and Hologram Grid */}
      <div className="absolute inset-0 hologram-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Hero Copy & Actions */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-bold text-cyan-300 tracking-wider uppercase">
              First Indigenous AI Assistant of Manipur
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Discover Manipur with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-400">
                Intelligence.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl font-serif text-purple-300 font-medium">
              "Your State. Your Language. Your AI."
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Welcome to <strong>MANIPUR AI</strong> — an intelligent conversational companion dedicated to the state of Manipur. Get instant, fact-checked answers on local history, tourism, government welfare schemes, education, agriculture, emergency contacts, and multilingual translation in <strong>Meiteilon (ꯃꯤꯇꯩꯂꯣꯟ)</strong>, English, and Hindi.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            <button
              onClick={() => onNavigate('chat')}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 flex items-center gap-2 transition-all hover:scale-102"
            >
              <MessageSquare className="w-4 h-4" /> Start Chatting Now
            </button>

            <button
              onClick={() => onNavigate('tourism-3d')}
              className="py-3 px-6 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm shadow-md flex items-center gap-2 transition-all hover:text-cyan-300"
            >
              <Compass className="w-4 h-4 text-cyan-400" /> Explore Manipur 3D
            </button>

            <button
              onClick={onOpenVoiceCall}
              className="py-3 px-4 rounded-2xl bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-800/60 font-semibold text-sm flex items-center gap-1.5 transition-all shadow-sm"
              title="Speak with AI Voice Assistant"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" /> Live Voice
            </button>
          </div>

          {/* Popular Prompt Chips */}
          <div className="pt-4 border-t border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-400 block mb-2 uppercase tracking-wider">
              Try asking Manipur AI:
            </span>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onAskPrompt(prompt)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-purple-950/80 border border-slate-800 hover:border-purple-500/50 text-xs text-slate-300 hover:text-cyan-300 transition-all text-left flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 3D Holographic Avatar Display */}
        <div className="lg:col-span-5 h-[460px] sm:h-[500px] w-full relative flex items-center justify-center">
          <div className="w-full h-full glass-panel-glow rounded-3xl overflow-hidden border border-slate-700/80 relative shadow-2xl">
            <HologramAvatar
              state={avatarState}
              onStateChange={onAvatarStateChange}
              interactive={true}
            />

            {/* Subtle Corner Badge */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-[10px] text-cyan-300 font-mono tracking-wider backdrop-blur-md">
              HOLOGRAPHIC AI v2.6
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
