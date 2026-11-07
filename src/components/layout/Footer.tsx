/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppNavigationTab } from '../../types';
import { Sparkles, Heart, Shield, PhoneCall, ExternalLink, Globe } from 'lucide-react';

interface FooterProps {
  onTabChange: (tab: AppNavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/80 mt-16 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-sm font-extrabold text-white tracking-wider">
                MANIPUR<span className="text-cyan-400">.AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tagline: <em>"Your State. Your Language. Your AI."</em>
            </p>
            <p className="text-[11px] text-slate-500 font-serif">
              Dedicated intelligent assistant for Manipur, India — preserving indigenous culture, language (Meiteilon / ꯃꯤꯇꯩ ꯃꯌꯦꯛ), history, tourism, and verified public services.
            </p>
            <div className="text-[10px] font-mono text-purple-400 pt-1">
              ꯃꯤꯇꯩꯂꯣꯟ • ENGLISH • HINDI
            </div>
          </div>

          {/* Platform Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onTabChange('home')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('chat')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  AI Chatbot & Document Scanner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('knowledge')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Verified Knowledge Repository
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('tourism-3d')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  3D Topographical Map & Places
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('translator')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Manipuri ⇄ English Translator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('mobile-app')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Android & iOS Mobile Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Key Topics */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Manipur Heritage & Landmarks
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Loktak Lake & Floating Phumdis</li>
              <li>Keibul Lamjao National Park & Sangai Deer</li>
              <li>Kangla Fort & Royal Dynasty (33 AD)</li>
              <li>Ima Keithel (Mother's Market)</li>
              <li>Shirui Hills & Endemic Shirui Lily</li>
              <li>Polo (Sagol Kangjei) & Mapal Kangjeibung</li>
              <li>CMHT Health Scheme & Manipur StartUp 2.0</li>
            </ul>
          </div>

          {/* Emergency & Official State Portals */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-rose-400">
              <PhoneCall className="w-3.5 h-3.5" /> Emergency Helplines
            </h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Police Response:</span>
                <span className="font-mono text-cyan-300 font-bold">112</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Medical Ambulance:</span>
                <span className="font-mono text-cyan-300 font-bold">108</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Women In Distress:</span>
                <span className="font-mono text-cyan-300 font-bold">181</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Childline Helpline:</span>
                <span className="font-mono text-cyan-300 font-bold">1098</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Disaster Management:</span>
                <span className="font-mono text-cyan-300 font-bold">1070</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong>MANIPUR AI</strong>. Empowering the people of Manipur with verified intelligence.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-serif text-slate-400">
              ꯌꯥꯏꯐꯔꯦ! ꯑꯩꯈꯣꯏꯒꯤ ꯃꯅꯤꯄꯨꯔ ꯑꯦꯑꯥꯏ
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <button
              onClick={() => onTabChange('admin')}
              className="hover:text-purple-400 transition-colors"
            >
              System Telemetry & SQL
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
