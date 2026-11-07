/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Linthoingambi Devi',
      role: 'Research Scholar, Manipur University (Canchipur)',
      avatar: 'LD',
      text: 'Having an AI that accurately understands Meitei Mayek script and references Cheitharol Kumbaba without inventing dates is a monumental breakthrough for our regional scholarship.',
      highlight: 'Meitei Mayek & Historical Accuracy',
    },
    {
      name: 'Sanatomba Singh',
      role: 'Organic Agro-Entrepreneur, Thoubal District',
      avatar: 'SS',
      text: 'Manipur AI provided clear guidance on the MOVCDNER organic scheme and packaging standards for our Chak-Hao (Black Rice) GI brand. It is an indispensable partner for local youth enterprises.',
      highlight: 'Chak-Hao GI & Government Schemes',
    },
    {
      name: 'Dr. Arindam Sen',
      role: 'Wildlife Biologist & Eco-Tourism Photographer',
      avatar: 'AS',
      text: 'The 3D topographical map and precise recommendations for visiting Keibul Lamjao National Park and Sendra island made my documentary shoot on the Sangai deer completely seamless.',
      highlight: 'Loktak & Sangai Habitat Insights',
    },
    {
      name: 'Victoria Bennett',
      role: 'Cultural Documentarian, London',
      avatar: 'VB',
      text: 'The explanation of the historical Lallup system and the 500-year matriarchal economics of Ima Keithel was richer and more culturally respectful than any standard search engine.',
      highlight: 'Ima Keithel & Heritage Depth',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <span className="text-xs font-bold text-purple-400 tracking-wider uppercase flex items-center justify-center gap-1.5">
          <Quote className="w-4 h-4 text-cyan-400" /> Community Voices
        </span>
        <h2 className="text-3xl font-black text-white">
          Loved by Citizens, Scholars & Travelers
        </h2>
        <p className="text-xs text-slate-300">
          Hear from the people of Manipur and global researchers using Manipur AI every day.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="glass-panel p-5 rounded-3xl border border-slate-800 flex flex-col justify-between shadow-xl relative"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 text-xs mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>

              <span className="text-[10px] font-mono text-cyan-400 block mb-2 font-semibold">
                "{t.highlight}"
              </span>

              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{t.text}"
              </p>
            </div>

            <div className="flex items-center gap-3 mt-5 pt-3 border-t border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-xs text-slate-950 shrink-0">
                {t.avatar}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-white truncate">{t.name}</h4>
                <p className="text-[10px] text-slate-400 truncate">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
