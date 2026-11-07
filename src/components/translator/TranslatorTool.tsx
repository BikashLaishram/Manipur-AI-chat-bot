/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SupportedLanguage } from '../../types';
import { translateText } from '../../services/api';
import { MEITEILON_GLOSSARY, SUPPORTED_LANGUAGES } from '../../data/manipurKnowledge';
import {
  ArrowLeftRight,
  Volume2,
  Copy,
  Check,
  Sparkles,
  Languages,
  BookOpen
} from 'lucide-react';

export const TranslatorTool: React.FC = () => {
  const [sourceLang, setSourceLang] = useState<SupportedLanguage>('en');
  const [targetLang, setTargetLang] = useState<SupportedLanguage>('mni');
  const [inputText, setInputText] = useState<string>('Hello, how can I help you in Manipur?');
  const [translatedResult, setTranslatedResult] = useState<string>('Khurumjari, Manipurda eina nangonda karamna mateng pangbige? (ꯈꯨꯔꯨꯃꯖꯔꯤ, ꯃꯅꯤꯄꯨꯔꯗ ꯑꯩꯅ ꯅꯪꯑꯣꯟꯗ ꯀꯔꯝꯅ ꯃꯇꯦꯡ ꯄꯥꯡꯕꯤꯒꯦ?)');
  const [meiteiScript, setMeiteiScript] = useState<string>('ꯈꯨꯔꯨꯃꯖꯔꯤ, ꯃꯅꯤꯄꯨꯔꯗ ꯑꯩꯅ ꯅꯪꯑꯣꯟꯗ ꯀꯔꯝꯅ ꯃꯇꯦꯡ ꯄꯥꯡꯕꯤꯒꯦ?');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Swap languages
  const handleSwap = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    setInputText(translatedResult);
    setTranslatedResult(inputText);
  };

  // Perform translation
  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);

    try {
      const res = await translateText(inputText, sourceLang, targetLang);
      setTranslatedResult(res.translatedText);
      if (res.meiteiMayek) {
        setMeiteiScript(res.meiteiMayek);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Speech pronunciation
  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*_#()]/g, '');
    const u = new SpeechSynthesisUtterance(clean);
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Title */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Languages className="w-4 h-4" /> Multilingual Meiteilon Engine
        </div>
        <h2 className="text-2xl font-extrabold text-white mt-1">
          Manipuri (Meiteilon) ⇄ English ⇄ Hindi Translator
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Supports native Meitei Mayek script (ꯃꯤꯇꯩ ꯃꯌꯦꯛ), Roman phonetic transliteration, and standard English/Hindi.
        </p>
      </div>

      {/* Main Translation Box */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-4">
        {/* Language selectors and swap */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">From:</span>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value as SupportedLanguage)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.name} ({l.nativeName})</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSwap}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors shadow-sm"
            title="Swap Languages"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">To:</span>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value as SupportedLanguage)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.name} ({l.nativeName})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Text areas grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Source Input */}
          <div className="flex flex-col justify-between p-4 rounded-xl bg-slate-950/70 border border-slate-800 min-h-[180px]">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to translate..."
              className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 resize-none focus:outline-none flex-1"
            />
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs text-slate-500">
              <span>{inputText.length} characters</span>
              <button
                onClick={() => setInputText('')}
                className="hover:text-slate-300 text-[11px]"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Translated Result */}
          <div className="flex flex-col justify-between p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 min-h-[180px] relative">
            <div className="space-y-3 flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center gap-2 text-cyan-400 text-xs py-4">
                  <Sparkles className="w-4 h-4 animate-spin-slow" /> Translating with linguistic grounding...
                </div>
              ) : (
                <>
                  <p className="text-sm text-white leading-relaxed font-sans">
                    {translatedResult}
                  </p>
                  {targetLang === 'mni' && meiteiScript && (
                    <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-800/40">
                      <span className="text-[10px] text-purple-400 block font-mono uppercase mb-1">Meitei Mayek Script:</span>
                      <p className="text-base text-cyan-200 font-serif tracking-wide">{meiteiScript}</p>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
              <span className="text-[11px] text-slate-400">
                AI Powered Translation
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSpeak(translatedResult)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
                  title="Pronounce"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 transition-colors"
                  title="Copy Translation"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={handleTranslate}
            disabled={isLoading || !inputText.trim()}
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" /> Translate Now
          </button>
        </div>
      </div>

      {/* Meiteilon Common Expressions & Cultural Phrases */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <BookOpen className="w-4 h-4 text-purple-400" />
          Common Manipuri / Meiteilon Phrases for Quick Learning
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {MEITEILON_GLOSSARY.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setInputText(item.english);
                setSourceLang('en');
                setTargetLang('mni');
                setTranslatedResult(`${item.phrase} (${item.script})`);
                setMeiteiScript(item.script);
              }}
              className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 group-hover:text-cyan-200">
                  {item.phrase}
                </span>
                <span className="text-[10px] text-purple-400 font-mono">
                  {item.context}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-serif mt-0.5">
                {item.script}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 italic">
                "{item.english}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
