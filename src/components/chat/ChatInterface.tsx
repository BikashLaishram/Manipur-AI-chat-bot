/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  ChatMessage,
  Conversation,
  SupportedLanguage,
  ChatAttachment,
  AvatarState,
} from '../../types';
import { sendChatMessage } from '../../services/api';
import {
  Send,
  Mic,
  MicOff,
  Paperclip,
  RotateCcw,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Plus,
  Trash2,
  Sparkles,
  FileText,
  Image as ImageIcon,
  Languages,
  X,
  Bot,
  User,
  ExternalLink
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../data/manipurKnowledge';

interface ChatInterfaceProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  avatarState: AvatarState;
  onAvatarStateChange: (state: AvatarState) => void;
  initialQuery?: string;
}

const DEFAULT_SUGGESTIONS = [
  'What makes Loktak Lake unique in the world?',
  'Tell me about the ancient Kingdom of Kangla and King Pakhangba',
  'How to apply for Chief Minister-gi Hakshelgi Tengbang (CMHT)?',
  'What is the story behind the endangered Sangai deer?',
  'Teach me 5 polite greetings in Meiteilon with Meitei Mayek',
  'Explain the historical origin of modern Polo in Manipur',
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  currentLanguage,
  onLanguageChange,
  avatarState,
  onAvatarStateChange,
  initialQuery,
}) => {
  // Chat sessions state
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('manipur_ai_conversations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'conv-initial',
        title: 'Welcome to Manipur AI',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        language: currentLanguage,
        messages: [
          {
            id: 'msg-welcome',
            role: 'assistant',
            content: `**Khurumjari! (ꯈꯨꯔꯨꯃꯖꯔꯤ)**\n\nI am **MANIPUR AI** — *Your State. Your Language. Your AI.*\n\nI am here to assist you with everything about Manipur:\n- 🏞️ **Tourism & Geography**: Loktak Lake, Keibul Lamjao, Shirui Hills, Kangla Fort\n- 📜 **History & Heritage**: Ancient Kangleipak, Anglo-Manipur War 1891, Maharaja Bhagyachandra\n- 🎭 **Culture & Dance**: Raas Leela, Pung Cholom, Yaoshang, traditional attire\n- 🏛️ **Government Schemes**: CMHT, Manipur StartUp, scholarships & emergency contacts\n- 🌾 **Agriculture & Business**: Chak-Hao (GI Black Rice), Sirarakhong Hathei chilli\n\nHow can I help you today? You can type in **English**, **Meiteilon (Manipuri)**, or **Hindi**.`,
            timestamp: Date.now(),
            suggestedFollowUps: DEFAULT_SUGGESTIONS.slice(0, 4),
          },
        ],
      },
    ];
  });

  const [activeConvId, setActiveConvId] = useState<string>('conv-initial');
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attachment, setAttachment] = useState<ChatAttachment | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Active conversation
  const activeConversation = conversations.find(c => c.id === activeConvId) || conversations[0];

  // Persist conversations
  useEffect(() => {
    localStorage.setItem('manipur_ai_conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isLoading]);

  // Handle external initial query (e.g. from 3D map click or popular questions)
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(prev => prev ? `${prev} ${transcript}` : transcript);
        setIsRecording(false);
        onAvatarStateChange('idle');
      };

      recognition.onerror = () => {
        setIsRecording(false);
        onAvatarStateChange('idle');
      };

      recognition.onend = () => {
        setIsRecording(false);
        if (avatarState === 'listening') {
          onAvatarStateChange('idle');
        }
      };

      recognitionRef.current = recognition;
    }
  }, [currentLanguage]);

  // Toggle voice recording
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use text input or check microphone permissions.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      onAvatarStateChange('idle');
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        onAvatarStateChange('listening');
      } catch (err) {
        console.error('Mic start error:', err);
      }
    }
  };

  // Handle file uploads (Images, PDFs, Docs)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('File size exceeds 8MB limit. Please upload a smaller file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAttachment({
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || inputValue).trim();
    if (!prompt && !attachment) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: Date.now(),
      language: currentLanguage,
      attachments: attachment ? [attachment] : undefined,
    };

    const currentMessages = [...(activeConversation?.messages || []), userMessage];

    // Update conversation state with user message
    setConversations(prev =>
      prev.map(c => {
        if (c.id === activeConvId) {
          return {
            ...c,
            title: c.messages.length <= 1 ? (prompt.slice(0, 36) || 'Document Analysis') : c.title,
            updatedAt: Date.now(),
            messages: currentMessages,
          };
        }
        return c;
      })
    );

    setInputValue('');
    const currentAttachment = attachment;
    setAttachment(null);
    setIsLoading(true);
    onAvatarStateChange('thinking');

    try {
      const result = await sendChatMessage(
        prompt,
        currentMessages,
        currentLanguage,
        currentAttachment ? { name: currentAttachment.name, dataUrl: currentAttachment.dataUrl || '' } : undefined
      );

      const aiMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: result.response,
        timestamp: Date.now(),
        language: result.language || currentLanguage,
        suggestedFollowUps: result.suggestedFollowUps || DEFAULT_SUGGESTIONS.slice(2, 5),
      };

      setConversations(prev =>
        prev.map(c => {
          if (c.id === activeConvId) {
            return {
              ...c,
              updatedAt: Date.now(),
              messages: [...c.messages, aiMessage],
            };
          }
          return c;
        })
      );
    } catch (err: any) {
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
      onAvatarStateChange('idle');
    }
  };

  // Create new chat
  const handleNewChat = () => {
    const newId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      title: 'New Manipur Inquiry',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      language: currentLanguage,
      messages: [
        {
          id: `msg-welcome-${Date.now()}`,
          role: 'assistant',
          content: `**Khurumjari!** What would you like to explore about Manipur today?`,
          timestamp: Date.now(),
          suggestedFollowUps: DEFAULT_SUGGESTIONS.slice(0, 3),
        },
      ],
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConvId(newId);
  };

  // Delete chat
  const handleDeleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (conversations.length <= 1) {
      handleNewChat();
      return;
    }
    const filtered = conversations.filter(c => c.id !== id);
    setConversations(filtered);
    if (activeConvId === id) {
      setActiveConvId(filtered[0].id);
    }
  };

  // Copy message text
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Text-To-Speech playback
  const handleSpeak = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device.');
      return;
    }

    if (speakingMessageId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      onAvatarStateChange('idle');
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown symbols for clearer speech
    const cleanSpeech = text.replace(/[*#_`]/g, '').slice(0, 400);
    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    setSpeakingMessageId(id);
    onAvatarStateChange('speaking');

    utterance.onend = () => {
      setSpeakingMessageId(null);
      onAvatarStateChange('idle');
    };

    utterance.onerror = () => {
      setSpeakingMessageId(null);
      onAvatarStateChange('idle');
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] max-h-[880px] w-full rounded-2xl overflow-hidden glass-panel border border-slate-800 shadow-2xl">
      {/* Left Sidebar: Chat History */}
      <div
        className={`${
          sidebarOpen ? 'w-64 md:w-72' : 'w-0'
        } transition-all duration-300 bg-slate-950/80 border-r border-slate-800/80 flex flex-col shrink-0 overflow-hidden`}
      >
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <button
            onClick={handleNewChat}
            className="flex-1 py-2 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" /> New Chat
          </button>
        </div>

        {/* Sessions list */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveConvId(conv.id)}
              className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-xs transition-all ${
                conv.id === activeConvId
                  ? 'bg-slate-800/90 text-white font-medium border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Bot className={`w-3.5 h-3.5 shrink-0 ${conv.id === activeConvId ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="truncate">{conv.title}</span>
              </div>
              <button
                onClick={(e) => handleDeleteChat(conv.id, e)}
                title="Delete Chat"
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Language selector in sidebar */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
          <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5 mb-1.5">
            <Languages className="w-3.5 h-3.5 text-cyan-400" /> Language:
          </label>
          <div className="grid grid-cols-3 gap-1">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`py-1 px-1.5 rounded-lg text-[10px] font-medium transition-all ${
                  currentLanguage === lang.code
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Conversation View */}
      <div className="flex-1 flex flex-col bg-slate-900/30 overflow-hidden relative">
        {/* Chat Header Bar */}
        <div className="h-14 px-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
              title="Toggle sidebar"
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                MANIPUR AI Assistant
              </h2>
              <p className="text-[10px] text-slate-400">
                Grounding with verified Manipur culture, tourism, history & government data
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-purple-300 hidden sm:inline px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-800/40">
              {currentLanguage === 'mni' ? 'ꯃꯤꯇꯩꯂꯣꯟ (Meiteilon)' : currentLanguage === 'hi' ? 'हिन्दी (Hindi)' : 'English'}
            </span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
          {activeConversation?.messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                    isUser
                      ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white'
                      : 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 font-bold" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`relative group rounded-2xl p-4 text-xs md:text-sm leading-relaxed shadow-lg ${
                    isUser
                      ? 'bg-purple-600 text-white rounded-tr-none'
                      : 'bg-slate-800/90 text-slate-100 rounded-tl-none border border-slate-700/80 backdrop-blur-md'
                  }`}
                >
                  {/* Attached Document/Image preview */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="mb-2 p-2 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center gap-2">
                      {msg.attachments[0].type.includes('image') ? (
                        <ImageIcon className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <FileText className="w-4 h-4 text-purple-400" />
                      )}
                      <span className="text-xs font-mono text-slate-300 truncate">
                        {msg.attachments[0].name}
                      </span>
                    </div>
                  )}

                  {/* Message Content with Markdown rendering */}
                  <div className="whitespace-pre-wrap space-y-2">
                    {msg.content}
                  </div>

                  {/* Actions footer for AI replies */}
                  {!isUser && (
                    <div className="mt-3 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" /> Copy
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleSpeak(msg.id, msg.content)}
                          className={`hover:text-cyan-400 flex items-center gap-1 transition-colors ${
                            speakingMessageId === msg.id ? 'text-cyan-400 font-semibold' : ''
                          }`}
                          title="Listen to speech"
                        >
                          {speakingMessageId === msg.id ? (
                            <>
                              <VolumeX className="w-3 h-3 text-cyan-400 animate-pulse" /> Stop Voice
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3" /> Listen
                            </>
                          )}
                        </button>
                      </div>

                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  )}

                  {/* Follow-up question chips */}
                  {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-700/40 flex flex-wrap gap-1.5">
                      {msg.suggestedFollowUps.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(prompt)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-purple-950/80 border border-slate-700 hover:border-purple-500/60 text-[11px] text-slate-300 hover:text-cyan-300 transition-all text-left"
                        >
                          → {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Thinking / Streaming Indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-xl">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin-slow" />
              </div>
              <div className="rounded-2xl rounded-tl-none p-4 bg-slate-800/60 border border-slate-700 text-xs text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono text-cyan-300">Manipur AI is analyzing knowledge base...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Floating Attachment Indicator */}
        {attachment && (
          <div className="mx-4 mb-2 p-2 rounded-xl bg-slate-800/90 border border-purple-500/40 flex items-center justify-between text-xs backdrop-blur-md">
            <div className="flex items-center gap-2 truncate">
              <Paperclip className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-white truncate font-mono">{attachment.name}</span>
              <span className="text-slate-400 text-[10px]">({Math.round(attachment.size / 1024)} KB)</span>
            </div>
            <button
              onClick={() => setAttachment(null)}
              className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 md:p-4 bg-slate-950/60 border-t border-slate-800/80 backdrop-blur-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-1.5 focus-within:border-cyan-400/80 transition-colors shadow-xl"
          >
            {/* File upload button */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,image/*,.doc,.docx,.txt"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload document or image"
              className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 transition-colors"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Microphone button */}
            <button
              type="button"
              onClick={toggleRecording}
              title={isRecording ? 'Stop recording' : 'Voice input'}
              className={`p-2 rounded-xl transition-all ${
                isRecording
                  ? 'bg-rose-500/20 text-rose-400 animate-pulse border border-rose-500/50'
                  : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80'
              }`}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Text input */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                currentLanguage === 'mni'
                  ? 'ꯃꯅꯤꯄꯨꯔꯒꯤ ꯃꯇꯥꯡꯗ ꯍꯪꯕꯤꯌꯨ... (Ask about Manipur in Meiteilon/English)'
                  : currentLanguage === 'hi'
                  ? 'मणिपुर के इतिहास, पर्यटन और योजनाओं के बारे में पूछें...'
                  : 'Ask Manipur AI about history, culture, Loktak, schemes, travel...'
              }
              className="flex-1 bg-transparent px-2 text-xs md:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={isLoading || (!inputValue.trim() && !attachment)}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:opacity-40 text-white transition-all shadow-md shadow-purple-600/30"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
