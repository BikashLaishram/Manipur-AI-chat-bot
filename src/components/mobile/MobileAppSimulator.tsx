/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Smartphone,
  Apple,
  Home,
  MessageSquare,
  Mic,
  Compass,
  User,
  Bell,
  Search,
  MapPin,
  Shield,
  Wifi,
  Battery,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  Fingerprint,
  Moon,
  Download
} from 'lucide-react';
import { TOURISM_SPOTS, EMERGENCY_SERVICES } from '../../data/manipurKnowledge';

interface MobileAppSimulatorProps {
  onOpenWebChat?: () => void;
}

export const MobileAppSimulator: React.FC<MobileAppSimulatorProps> = ({ onOpenWebChat }) => {
  const [deviceType, setDeviceType] = useState<'ios' | 'android'>('android');
  const [currentScreen, setCurrentScreen] = useState<'home' | 'chat' | 'voice' | 'explore' | 'profile'>('home');
  const [mobileChatInput, setMobileChatInput] = useState<string>('');
  const [mobileMessages, setMobileMessages] = useState<Array<{ role: string; text: string }>>([
    { role: 'assistant', text: 'Khurumjari! I am your mobile Manipur AI assistant. How can I help you today?' },
  ]);
  const [biometricEnabled, setBiometricEnabled] = useState<boolean>(true);
  const [offlineSaved, setOfflineSaved] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // Trigger test notification
  const triggerNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4500);
  };

  const handleSendMobileChat = () => {
    if (!mobileChatInput.trim()) return;
    const txt = mobileChatInput.trim();
    setMobileMessages(prev => [
      ...prev,
      { role: 'user', text: txt },
      { role: 'assistant', text: `Analyzing Manipur databases for "${txt}". Loktak Lake and Kangla Fort information verified.` },
    ]);
    setMobileChatInput('');
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-6">
      {/* Device Switcher & Controls */}
      <div className="glass-panel px-6 py-3 rounded-2xl border border-slate-800 flex items-center justify-between w-full max-w-md shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Device:</span>
          <button
            onClick={() => setDeviceType('android')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceType === 'android'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Android (Pixel 9 Pro)
          </button>
          <button
            onClick={() => setDeviceType('ios')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceType === 'ios'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Apple className="w-3.5 h-3.5" /> iOS (iPhone 16 Pro)
          </button>
        </div>

        <button
          onClick={triggerNotification}
          title="Simulate Push Notification"
          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors"
        >
          <Bell className="w-4 h-4" />
        </button>
      </div>

      {/* Realistic Mobile Frame */}
      <div
        className={`relative w-[360px] h-[720px] bg-slate-950 rounded-[44px] border-4 p-3 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          deviceType === 'ios'
            ? 'border-slate-700 rounded-[52px]'
            : 'border-slate-800 rounded-[40px]'
        }`}
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px -10px rgba(124, 58, 237, 0.25)',
        }}
      >
        {/* Dynamic Island / Camera Punch Hole */}
        {deviceType === 'ios' ? (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-3 border border-slate-800/80">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-slate-800" />
          </div>
        ) : (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-40 border border-slate-800" />
        )}

        {/* Status Bar */}
        <div className="h-7 w-full flex items-center justify-between px-5 text-[11px] text-slate-300 font-medium z-30 select-none">
          <span>09:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono">5G</span>
            <Wifi className="w-3 h-3 text-slate-300" />
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>

        {/* In-app Push Notification Banner */}
        {showNotification && (
          <div className="absolute top-10 left-3 right-3 p-3 rounded-2xl bg-slate-900/95 border border-cyan-500/40 shadow-2xl z-50 animate-bounce duration-500 backdrop-blur-md flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-cyan-300">MANIPUR AI Alert</span>
                <span className="text-[9px] text-slate-400">Just now</span>
              </div>
              <p className="text-[11px] text-white font-medium mt-0.5">
                🌸 Shirui Lily Festival registration announced in Ukhrul!
              </p>
            </div>
          </div>
        )}

        {/* Screen Viewport Container */}
        <div className="flex-1 overflow-y-auto rounded-[32px] bg-slate-900/60 p-3 pt-2 text-slate-100 flex flex-col justify-between scrollbar-none">
          {/* SCREEN: HOME */}
          {currentScreen === 'home' && (
            <div className="space-y-3.5">
              {/* App Bar */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                    Imphal Valley • 24°C
                  </span>
                  <h3 className="text-base font-extrabold text-white">
                    Khurumjari, Bikash 👋
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[11px] font-bold text-cyan-300">
                    BL
                  </div>
                </div>
              </div>

              {/* Holographic Assistant Hero Card */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-900/50 via-slate-900 to-cyan-950/40 border border-purple-500/30 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-300 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> 3D AI Hologram
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[9px]">
                    Online
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1">
                  Discover Manipur with Intelligence
                </h4>
                <p className="text-[10px] text-slate-300 mt-0.5">
                  Your state. Your language. Your AI assistant.
                </p>
                <div className="flex gap-2 mt-2.5">
                  <button
                    onClick={() => setCurrentScreen('chat')}
                    className="flex-1 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-semibold text-center shadow-md"
                  >
                    Start Chat
                  </button>
                  <button
                    onClick={() => setCurrentScreen('voice')}
                    className="flex-1 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-semibold text-center border border-slate-700"
                  >
                    Voice Mode
                  </button>
                </div>
              </div>

              {/* Quick Prompt Shortcuts */}
              <div>
                <span className="text-[11px] font-bold text-slate-300 block mb-1.5">
                  Popular in Manipur:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setCurrentScreen('chat');
                      setMobileMessages(prev => [
                        ...prev,
                        { role: 'user', text: 'Tell me about Loktak Lake Phumdis' },
                        { role: 'assistant', text: 'Loktak Lake is the largest freshwater lake in Northeast India, famous for circular floating vegetative masses called Phumdis!' }
                      ]);
                    }}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-left hover:border-cyan-500/40 transition-colors"
                  >
                    <span className="text-[11px] font-bold text-cyan-300 block">Loktak Lake</span>
                    <span className="text-[9px] text-slate-400">Floating Phumdis</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentScreen('chat');
                      setMobileMessages(prev => [
                        ...prev,
                        { role: 'user', text: 'How to apply for CMHT scheme?' },
                        { role: 'assistant', text: 'Chief Minister-gi Hakshelgi Tengbang (CMHT) provides cashless medical treatment up to ₹5,00,000 per family per year for secondary/tertiary care.' }
                      ]);
                    }}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-left hover:border-purple-500/40 transition-colors"
                  >
                    <span className="text-[11px] font-bold text-purple-300 block">CMHT Scheme</span>
                    <span className="text-[9px] text-slate-400">Health Coverage</span>
                  </button>
                </div>
              </div>

              {/* Featured Places */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-slate-300">Top Attractions</span>
                  <button
                    onClick={() => setCurrentScreen('explore')}
                    className="text-[10px] text-cyan-400 font-semibold"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-1.5">
                  {TOURISM_SPOTS.slice(0, 2).map((spot) => (
                    <div
                      key={spot.id}
                      className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        <div>
                          <span className="text-[11px] font-bold text-white block">{spot.name}</span>
                          <span className="text-[9px] text-slate-400">{spot.district}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-purple-300">
                        {spot.distanceFromImphal}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SCREEN: CHAT */}
          {currentScreen === 'chat' && (
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Manipur AI Mobile
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Meiteilon / En</span>
              </div>

              <div className="flex-1 overflow-y-auto py-2 space-y-2 scrollbar-none text-[11px]">
                {mobileMessages.map((m, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-2xl max-w-[85%] leading-relaxed ${
                      m.role === 'user'
                        ? 'ml-auto bg-purple-600 text-white rounded-tr-none'
                        : 'bg-slate-950/80 text-slate-200 border border-slate-800 rounded-tl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5">
                <input
                  type="text"
                  value={mobileChatInput}
                  onChange={(e) => setMobileChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMobileChat()}
                  placeholder="Ask in English or Meiteilon..."
                  className="flex-1 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                />
                <button
                  onClick={handleSendMobileChat}
                  className="p-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {/* SCREEN: VOICE */}
          {currentScreen === 'voice' && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div>
                <span className="text-[10px] text-cyan-400 uppercase font-mono tracking-wider">
                  Real-time Audio Assistant
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Listening to you...
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Speak in Meiteilon (Manipuri), English or Hindi
                </p>
              </div>

              {/* Pulsing Hologram Voice Orb */}
              <div className="relative flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-purple-600/20 animate-ping absolute duration-1000" />
                <div className="w-24 h-24 rounded-full bg-cyan-500/20 animate-pulse absolute" />
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-600/40 z-10 cursor-pointer">
                  <Mic className="w-8 h-8 text-white animate-bounce" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 w-full text-xs text-slate-300">
                <span className="text-[10px] text-slate-500 block mb-0.5">Try saying:</span>
                "Loktak pat kadaida leibage?" or "Explain the CMHT health scheme."
              </div>
            </div>
          )}

          {/* SCREEN: EXPLORE */}
          {currentScreen === 'explore' && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-white">Explore Manipur Landmarks</h3>
              <div className="space-y-2 overflow-y-auto max-h-[500px] scrollbar-none">
                {TOURISM_SPOTS.map((spot) => (
                  <div key={spot.id} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[9px] uppercase font-mono text-purple-400">{spot.district}</span>
                    <h4 className="text-xs font-bold text-white">{spot.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">{spot.significance}</p>
                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800 text-[10px]">
                      <span className="text-cyan-300 font-mono">{spot.distanceFromImphal}</span>
                      <span className="text-emerald-400 font-medium">{spot.bestSeason}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN: PROFILE & SETTINGS */}
          {currentScreen === 'profile' && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-white text-sm">
                  BL
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Bikash Laishram</h4>
                  <p className="text-[10px] text-slate-400">Imphal West • Citizen Profile</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="flex items-center gap-2 text-slate-300 text-[11px]">
                    <Fingerprint className="w-3.5 h-3.5 text-purple-400" /> Biometric Face/Fingerprint
                  </span>
                  <input
                    type="checkbox"
                    checked={biometricEnabled}
                    onChange={(e) => setBiometricEnabled(e.target.checked)}
                    className="accent-purple-600"
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="flex items-center gap-2 text-slate-300 text-[11px]">
                    <Download className="w-3.5 h-3.5 text-cyan-400" /> Offline Knowledge Cache
                  </span>
                  <button
                    onClick={() => setOfflineSaved(!offlineSaved)}
                    className="text-[10px] font-semibold text-cyan-300"
                  >
                    {offlineSaved ? 'Saved (42MB)' : 'Download'}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Emergency Helpline</span>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-mono font-bold text-xs">Police & Dispatch</span>
                    <span className="text-rose-400 font-mono font-bold text-xs">112</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Mobile Tab Bar */}
        <div className="h-14 w-full bg-slate-950 border-t border-slate-800/80 rounded-b-[36px] flex items-center justify-around px-2 z-30 select-none">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-medium transition-colors ${
              currentScreen === 'home' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Home className="w-4 h-4" /> Home
          </button>
          <button
            onClick={() => setCurrentScreen('chat')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-medium transition-colors ${
              currentScreen === 'chat' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Chat
          </button>
          <button
            onClick={() => setCurrentScreen('voice')}
            className={`w-9 h-9 rounded-full -mt-4 bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/40`}
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentScreen('explore')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-medium transition-colors ${
              currentScreen === 'explore' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Compass className="w-4 h-4" /> Explore
          </button>
          <button
            onClick={() => setCurrentScreen('profile')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-medium transition-colors ${
              currentScreen === 'profile' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <User className="w-4 h-4" /> Profile
          </button>
        </div>
      </div>
    </div>
  );
};
