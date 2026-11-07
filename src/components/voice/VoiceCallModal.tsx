/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Bot,
  User,
  Radio,
  Globe
} from 'lucide-react';
import { SupportedLanguage } from '../../types';
import { sendChatMessage } from '../../services/api';

interface VoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
}

export const VoiceCallModal: React.FC<VoiceCallModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [callStatus, setCallStatus] = useState<'connecting' | 'listening' | 'thinking' | 'speaking'>('connecting');
  const [transcript, setTranscript] = useState<string>('');
  const [aiSpeech, setAiSpeech] = useState<string>('Khurumjari! I am Manipur AI voice assistant. Speak to me about any place, scheme, or history in Manipur.');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);

  const recognitionRef = useRef<any>(null);

  // Call timer
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Voice speech synthesis and recognition lifecycle
  useEffect(() => {
    if (!isOpen) return;

    setCallStatus('speaking');
    speakResponse(aiSpeech, () => {
      startListening();
    });

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isOpen]);

  const speakResponse = (text: string, onEnd?: () => void) => {
    if (!('speechSynthesis' in window)) {
      setCallStatus('listening');
      onEnd?.();
      return;
    }

    window.speechSynthesis.cancel();
    const clean = text.replace(/[*_#]/g, '');
    const u = new SpeechSynthesisUtterance(clean);
    u.rate = 1.0;
    u.pitch = 1.05;

    u.onstart = () => {
      setCallStatus('speaking');
    };

    u.onend = () => {
      setCallStatus('listening');
      onEnd?.();
    };

    u.onerror = () => {
      setCallStatus('listening');
      onEnd?.();
    };

    window.speechSynthesis.speak(u);
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setCallStatus('listening');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onstart = () => {
        setCallStatus('listening');
      };

      recognition.onresult = (event: any) => {
        const current = event.results[0][0].transcript;
        setTranscript(current);

        if (event.results[0].isFinal) {
          processUserVoice(current);
        }
      };

      recognition.onerror = () => {
        setCallStatus('listening');
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.error(e);
    }
  };

  const processUserVoice = async (text: string) => {
    setCallStatus('thinking');
    try {
      const res = await sendChatMessage(text, [], language);
      setAiSpeech(res.response);
      speakResponse(res.response, () => {
        startListening();
      });
    } catch (err) {
      setAiSpeech('I am here and ready to help. Please ask again.');
      speakResponse('I am here and ready to help. Please ask again.', () => {
        startListening();
      });
    }
  };

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-2xl flex flex-col items-center justify-between p-6 select-none animate-fadeIn">
      {/* Top Header */}
      <div className="w-full max-w-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-cyan-300 font-bold uppercase tracking-wider">
            Live AI Voice Session
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-mono font-medium">{formatTime(callDuration)}</span>
          <span className="px-2 py-0.5 rounded-full bg-purple-950 border border-purple-800 text-[10px] text-purple-300 uppercase">
            {language}
          </span>
        </div>
      </div>

      {/* Central Visualizer & Avatar Representation */}
      <div className="flex flex-col items-center justify-center space-y-6 my-auto text-center max-w-lg">
        {/* Hologram Pulsing Core */}
        <div className="relative flex items-center justify-center">
          <div className={`w-64 h-64 rounded-full border border-cyan-500/20 absolute ${
            callStatus === 'speaking' ? 'animate-ping duration-1000' : ''
          }`} />
          <div className="w-48 h-48 rounded-full border border-purple-500/30 blur-sm absolute" />
          
          <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-1 flex items-center justify-center shadow-2xl shadow-purple-600/50">
            <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center">
              <Sparkles className="w-10 h-10 text-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono text-purple-300 font-bold uppercase mt-1">
                {callStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Live Audio Status Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-white">
            {callStatus === 'speaking' ? 'Manipur AI is speaking...' :
             callStatus === 'listening' ? 'Listening to your voice...' :
             callStatus === 'thinking' ? 'Synthesizing knowledge response...' : 'Connecting...'}
          </h2>

          {/* Subtitles / Live Transcript */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 max-h-36 overflow-y-auto leading-relaxed shadow-lg">
            {callStatus === 'listening' && transcript ? (
              <p className="italic text-cyan-200">"{transcript}"</p>
            ) : (
              <p className="line-clamp-4">{aiSpeech}</p>
            )}
          </div>
        </div>
      </div>

      {/* Call Actions Control Dock */}
      <div className="w-full max-w-md p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md flex items-center justify-around">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-3.5 rounded-full transition-all ${
            isMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <button
          onClick={() => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            onClose();
          }}
          className="p-4 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-xl shadow-rose-600/40 transition-all hover:scale-105"
          title="End Call"
        >
          <PhoneOff className="w-6 h-6" />
        </button>

        <button
          onClick={() => speakResponse(aiSpeech)}
          className="p-3.5 rounded-full bg-slate-800 text-slate-300 hover:text-cyan-300 transition-all"
          title="Repeat"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
