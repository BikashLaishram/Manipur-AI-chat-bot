/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppNavigationTab, SupportedLanguage, AvatarState, UserProfile, TourismSpot } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { FeaturesSection } from './components/landing/FeaturesSection';
import { CultureTourismSection } from './components/landing/CultureTourismSection';
import { PopularQuestionsSection } from './components/landing/PopularQuestionsSection';
import { TestimonialsSection } from './components/landing/TestimonialsSection';
import { ChatInterface } from './components/chat/ChatInterface';
import { KnowledgeExplorer } from './components/knowledge/KnowledgeExplorer';
import { ManipurMap3D } from './components/3d/ManipurMap3D';
import { TranslatorTool } from './components/translator/TranslatorTool';
import { MobileAppSimulator } from './components/mobile/MobileAppSimulator';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { VoiceCallModal } from './components/voice/VoiceCallModal';
import { AuthModal } from './components/auth/AuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppNavigationTab>('home');
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('manipur_ai_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return null;
  });
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState<boolean>(false);
  const [chatInitialQuery, setChatInitialQuery] = useState<string>('');

  // Scroll to top on tab change
  const handleTabChange = (tab: AppNavigationTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch chat with specific query (from prompts or landmarks)
  const handleLaunchChatWithPrompt = (prompt: string) => {
    setChatInitialQuery(prompt);
    setActiveTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle spot selection from 3D Map
  const handleSpotSelectFromMap = (spot: TourismSpot) => {
    handleLaunchChatWithPrompt(`Tell me the significance, visitor guidelines, and cultural heritage of ${spot.name} (${spot.nativeName}) in Manipur.`);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-cyan-300">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenVoiceCall={() => setIsVoiceCallOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 w-full">
        {/* VIEW: HOME LANDING */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <HeroSection
              onNavigate={handleTabChange}
              onAskPrompt={handleLaunchChatWithPrompt}
              avatarState={avatarState}
              onAvatarStateChange={setAvatarState}
              onOpenVoiceCall={() => setIsVoiceCallOpen(true)}
            />
            <FeaturesSection onNavigate={handleTabChange} />
            <CultureTourismSection
              onAskPrompt={handleLaunchChatWithPrompt}
              onNavigate={handleTabChange}
            />
            <PopularQuestionsSection onAskPrompt={handleLaunchChatWithPrompt} />
            <TestimonialsSection />
          </div>
        )}

        {/* VIEW: AI CHAT INTERFACE */}
        {activeTab === 'chat' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <ChatInterface
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
              avatarState={avatarState}
              onAvatarStateChange={setAvatarState}
              initialQuery={chatInitialQuery}
            />
          </div>
        )}

        {/* VIEW: KNOWLEDGE EXPLORER */}
        {activeTab === 'knowledge' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <KnowledgeExplorer onAskAI={handleLaunchChatWithPrompt} />
          </div>
        )}

        {/* VIEW: 3D TOPOGRAPHICAL MAP & LANDMARKS */}
        {activeTab === 'tourism-3d' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 shadow-xl">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Geospatial 3D Terrain Visualization
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                Topographical 3D Map of Manipur
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                Inspect the central Imphal Valley surrounded by the nine encircling hill ranges, the floating islands of Loktak Lake, Keibul Lamjao National Park, Kangla Fort, and Shirui Kashong peak. Click any beacon to inspect travel details or ask AI.
              </p>
            </div>

            <ManipurMap3D onSelectSpot={handleSpotSelectFromMap} />
          </div>
        )}

        {/* VIEW: MULTILINGUAL TRANSLATOR */}
        {activeTab === 'translator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <TranslatorTool />
          </div>
        )}

        {/* VIEW: MOBILE APP SIMULATOR */}
        {activeTab === 'mobile-app' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 shadow-xl mb-6 text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Native App Experience (iOS & Android)
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                MANIPUR AI Mobile Simulator
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Test the cross-platform mobile application on Android (Google Pixel 9 Pro) and iOS (iPhone 16 Pro) with simulated biometric security, voice assistant, and offline caching.
              </p>
            </div>

            <MobileAppSimulator onOpenWebChat={() => handleTabChange('chat')} />
          </div>
        )}

        {/* VIEW: ADMIN DASHBOARD & SQL */}
        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AdminDashboard />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer onTabChange={handleTabChange} />

      {/* Full-Screen Live Voice Calling Modal */}
      <VoiceCallModal
        isOpen={isVoiceCallOpen}
        onClose={() => setIsVoiceCallOpen(false)}
        language={currentLanguage}
      />

      {/* Authentication & User Profiles Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />
    </div>
  );
}
