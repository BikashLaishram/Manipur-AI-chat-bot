/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HelpCircle, Sparkles, ArrowRight, MessageSquare } from 'lucide-react';

interface PopularQuestionsSectionProps {
  onAskPrompt: (prompt: string) => void;
}

export const PopularQuestionsSection: React.FC<PopularQuestionsSectionProps> = ({ onAskPrompt }) => {
  const popularQuestions = [
    {
      category: 'Ecology & Tourism',
      question: 'What makes Loktak Lake and its floating Phumdis unique in the world?',
      preview: 'Loktak Lake is the largest freshwater lake in Northeast India and the only lake on earth featuring circular floating vegetative masses called Phumdis...',
    },
    {
      category: 'Government Schemes',
      question: 'How do I apply for the Chief Minister-gi Hakshelgi Tengbang (CMHT) health card?',
      preview: 'CMHT provides cashless secondary and tertiary medical treatment up to ₹5,00,000 per family per year for BPL, AAY, and unorganized workers...',
    },
    {
      category: 'Ancient Royalty',
      question: 'What is the history of King Nongda Lairen Pakhangba and Kangla Fort in 33 AD?',
      preview: 'Coronated in 33 AD at Kangla, King Pakhangba unified the seven Meitei clans and established the Ningthouja Dynasty, documented in Cheitharol Kumbaba...',
    },
    {
      category: 'Festivals & Dance',
      question: 'How is Yaoshang celebrated in Manipur and what is Thabal Chongba?',
      preview: 'Celebrated for five days during spring full moon, Yaoshang combines indigenous grassroots sports competitions with moonlit circle folk dancing...',
    },
    {
      category: 'Sports Heritage',
      question: 'How did modern Polo originate in Manipur from traditional Sagol Kangjei?',
      preview: 'Manipur is globally recognized as the birthplace of modern Polo, played on the Manipuri pony. Mapal Kangjeibung in Imphal is the world\'s oldest operating ground...',
    },
    {
      category: 'Language & Mayek',
      question: 'What are the essential polite greetings in Meiteilon and how are they written?',
      preview: 'Learn "Khurumjari" (ꯈꯨꯔꯨꯃꯖꯔꯤ - Hello), "Thaagatchari" (ꯊꯥꯒꯠꯆꯔꯤ - Thank you), and "Nungaibara?" (ꯅꯨꯡꯉꯥꯏꯕꯔꯥ? - How are you?) with native script...',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase flex items-center justify-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-purple-400" /> Frequently Asked Inquiries
        </span>
        <h2 className="text-3xl font-black text-white">
          Popular Questions Asked to Manipur AI
        </h2>
        <p className="text-xs text-slate-300">
          Click any question below to immediately converse with Manipur AI and explore verified factual answers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {popularQuestions.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onAskPrompt(item.question)}
            className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all flex flex-col justify-between group shadow-lg hover:-translate-y-1 duration-200"
          >
            <div>
              <span className="text-[10px] font-mono uppercase text-purple-400 font-semibold tracking-wider block mb-2">
                {item.category}
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                "{item.question}"
              </h3>
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed line-clamp-2">
                {item.preview}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Ask Assistant
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
