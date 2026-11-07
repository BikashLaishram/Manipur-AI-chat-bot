/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TOURISM_SPOTS } from '../../data/manipurKnowledge';
import { MapPin, Sparkles, Navigation, ArrowRight, Compass } from 'lucide-react';
import { AppNavigationTab } from '../../types';

interface CultureTourismSectionProps {
  onAskPrompt: (prompt: string) => void;
  onNavigate: (tab: AppNavigationTab) => void;
}

export const CultureTourismSection: React.FC<CultureTourismSectionProps> = ({
  onAskPrompt,
  onNavigate,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-bold text-purple-400 tracking-wider uppercase flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-cyan-400" /> Natural Wonders & Cultural Splendor
          </span>
          <h2 className="text-3xl font-black text-white mt-1">
            Iconic Jewels of Manipur
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            From the only floating national park on earth to Asia's 500-year-old mother's market, explore Manipur's timeless legacy.
          </p>
        </div>

        <button
          onClick={() => onNavigate('tourism-3d')}
          className="py-2 px-4 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/50 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0"
        >
          View Interactive 3D Map <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOURISM_SPOTS.slice(0, 6).map((spot) => (
          <div
            key={spot.id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between group shadow-xl hover:-translate-y-1 duration-300 relative overflow-hidden"
          >
            {/* Top badge */}
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-purple-300 text-[10px] font-mono uppercase">
                {spot.district}
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">
                {spot.distanceFromImphal} from capital
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {spot.name}
              </h3>
              <p className="text-xs text-purple-300 font-serif mt-0.5">
                {spot.nativeName}
              </p>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
                {spot.description}
              </p>

              <div className="mt-3.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div>
                  <strong className="text-slate-300 font-medium">Highlight: </strong>
                  <span>{spot.significance}</span>
                </div>
                <div>
                  <strong className="text-emerald-400 font-medium">Best Season: </strong>
                  <span>{spot.bestSeason}</span>
                </div>
              </div>
            </div>

            {/* Action footer */}
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {spot.tags.slice(0, 2).map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onAskPrompt(`Tell me everything about ${spot.name} in Manipur, including best time to visit and historical significance.`)}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                Ask AI <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
