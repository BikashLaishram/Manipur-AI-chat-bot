/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Sparkles,
  Languages,
  Database,
  Mic,
  FileSearch,
  Compass,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { AppNavigationTab } from '../../types';

interface FeaturesSectionProps {
  onNavigate: (tab: AppNavigationTab) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Sparkles,
      title: '3D Holographic Assistant',
      desc: 'Real-time 3D rendered avatar featuring eye-blinking, head tracking, animated lip-sync during speech, and futuristic particle fields.',
      color: 'from-cyan-500 to-blue-600',
      actionTab: 'home' as AppNavigationTab,
    },
    {
      icon: Languages,
      title: 'Multilingual Meiteilon Support',
      desc: 'Natural conversation in English, Manipuri (Meiteilon) with Meitei Mayek (ꯃꯤꯇꯩ ꯃꯌꯦꯛ) script, and Hindi with pronunciation guides.',
      color: 'from-purple-500 to-indigo-600',
      actionTab: 'translator' as AppNavigationTab,
    },
    {
      icon: Database,
      title: 'Fact-Checked Knowledge RAG',
      desc: 'Zero-hallucination groundings on Manipur history (from 33 AD), classical dance (Raas Leela), CMHT health scheme, and agriculture (GI Black Rice).',
      color: 'from-emerald-500 to-teal-600',
      actionTab: 'knowledge' as AppNavigationTab,
    },
    {
      icon: Mic,
      title: 'Voice-to-Voice AI Calling',
      desc: 'Hands-free voice recognition and conversational speech synthesis for elderly citizens, drivers, and tourists on the move.',
      color: 'from-rose-500 to-pink-600',
      actionTab: 'chat' as AppNavigationTab,
    },
    {
      icon: FileSearch,
      title: 'Multi-Modal Document Scanner',
      desc: 'Upload government PDFs, land records (patta), circulars, or tourist photos for immediate summarization and extraction.',
      color: 'from-amber-500 to-orange-600',
      actionTab: 'chat' as AppNavigationTab,
    },
    {
      icon: Compass,
      title: '3D Topographical Manipur Map',
      desc: 'Interactive 3D elevation map showing the Imphal Valley surrounded by mountain ranges, Loktak Lake, Keibul Lamjao, and Shirui peak.',
      color: 'from-indigo-500 to-cyan-500',
      actionTab: 'tourism-3d' as AppNavigationTab,
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase flex items-center justify-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-cyan-400" /> Platform Architecture & Capabilities
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          State-of-the-Art Intelligence Built for Manipur
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Engineered to bridge cutting-edge artificial intelligence with indigenous heritage and practical daily utility for every citizen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-xl hover:-translate-y-1 duration-300"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} p-0.5 shadow-lg mb-4 flex items-center justify-center`}
                >
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => onNavigate(feat.actionTab)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 group-hover:translate-x-1 transition-all"
                >
                  Explore Feature <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
