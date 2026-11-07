/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MANIPUR_KNOWLEDGE_BASE,
  TOURISM_SPOTS,
  HISTORICAL_EVENTS,
  GOVERNMENT_SCHEMES,
  EMERGENCY_SERVICES,
} from '../../data/manipurKnowledge';
import { KnowledgeCategory } from '../../types';
import {
  BookOpen,
  MapPin,
  Calendar,
  FileCheck,
  Wheat,
  PhoneCall,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface KnowledgeExplorerProps {
  onAskAI: (query: string) => void;
}

export const KnowledgeExplorer: React.FC<KnowledgeExplorerProps> = ({ onAskAI }) => {
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: KnowledgeCategory | 'all'; label: string; icon: any }[] = [
    { id: 'all', label: 'All Knowledge', icon: BookOpen },
    { id: 'tourism', label: 'Tourism & Wildlife', icon: MapPin },
    { id: 'history', label: 'History & Royalty', icon: Calendar },
    { id: 'culture', label: 'Culture & Arts', icon: Sparkles },
    { id: 'government', label: 'Govt Schemes', icon: FileCheck },
    { id: 'agriculture', label: 'Agriculture & GI', icon: Wheat },
    { id: 'emergency', label: 'Emergency Helplines', icon: PhoneCall },
  ];

  // Filter items
  const filteredKb = MANIPUR_KNOWLEDGE_BASE.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header and Search */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Manipur Knowledge Repository
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-1">
            Explore Manipur's Heritage, Governance & Nature
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Fact-checked information curated from official gazettes, historical royal chronicles (Cheitharol Kumbaba), and state departments.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Loktak, CMHT, Polo, Sangai..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-lg shadow-purple-600/25'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Section Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Render Primary Knowledge Base Items */}
        {filteredKb.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-mono uppercase text-cyan-400 border border-slate-700">
                  {item.category}
                </span>
                {item.titleManipuri && (
                  <span className="text-[11px] font-serif text-purple-300">
                    {item.titleManipuri}
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {item.summary}
              </p>

              <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed font-sans max-h-36 overflow-y-auto">
                {item.content}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 truncate max-w-[170px]" title={item.verifiedSource}>
                Source: {item.verifiedSource}
              </span>

              <button
                onClick={() => onAskAI(`Tell me more about ${item.title}`)}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                Deep Dive with AI <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* If Emergency Category is selected or All */}
        {(selectedCategory === 'all' || selectedCategory === 'emergency') && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 glass-panel p-6 rounded-2xl border border-rose-950/60 bg-gradient-to-br from-rose-950/20 via-slate-900/60 to-slate-950/80 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <PhoneCall className="w-5 h-5 text-rose-400" />
              <div>
                <h3 className="text-lg font-bold text-white">Verified 24x7 Emergency Helplines</h3>
                <p className="text-xs text-slate-400">Direct state emergency dispatch numbers for Manipur</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {EMERGENCY_SERVICES.map((srv) => (
                <div key={srv.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 font-bold">
                      {srv.category}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-0.5">{srv.service}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{srv.description}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-sm font-extrabold text-cyan-300 font-mono">
                      📞 {srv.helpline}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-[10px] text-emerald-400">
                      24x7
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If Government Schemes Category is selected or All */}
        {(selectedCategory === 'all' || selectedCategory === 'government') && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 glass-panel p-6 rounded-2xl border border-indigo-950/60 bg-gradient-to-br from-indigo-950/20 via-slate-900/60 to-slate-950/80 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <FileCheck className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="text-lg font-bold text-white">Manipur Government Welfare & Startup Schemes</h3>
                <p className="text-xs text-slate-400">Official eligibility guidelines and direct application portals</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GOVERNMENT_SCHEMES.map((scheme) => (
                <div key={scheme.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{scheme.name}</h4>
                    <span className="text-[11px] text-purple-300 block mt-0.5">{scheme.department}</span>
                    <p className="text-xs text-slate-300 mt-2 font-medium">Benefits: {scheme.benefits}</p>

                    <div className="mt-3 space-y-1">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Key Eligibility:</span>
                      <ul className="text-[11px] text-slate-300 list-disc list-inside space-y-0.5">
                        {scheme.eligibility.map((el, i) => (
                          <li key={i}>{el}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => onAskAI(`How can I apply for ${scheme.name}? What documents are required?`)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                    >
                      Step-by-step Guide <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={scheme.officialPortal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      Official Portal <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If History Category is selected or All */}
        {(selectedCategory === 'all' || selectedCategory === 'history') && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 glass-panel p-6 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-lg font-bold text-white">Chronological Historical Timeline of Manipur</h3>
                <p className="text-xs text-slate-400">From the 33 AD Ningthouja coronation to modern constitutional statehood</p>
              </div>
            </div>

            <div className="space-y-3">
              {HISTORICAL_EVENTS.map((ev) => (
                <div key={ev.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-800/60 text-amber-300 font-mono text-xs font-bold shrink-0">
                      {ev.year}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{ev.title}</h4>
                      <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">{ev.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {ev.keyFigures.map((f, i) => (
                          <span key={i} className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                            👤 {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onAskAI(`Tell me the detailed historical story of ${ev.title}`)}
                    className="shrink-0 text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 self-end md:self-center"
                  >
                    Historical Story <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
