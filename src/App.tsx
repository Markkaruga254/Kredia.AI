import React, { useState } from 'react';
import { formatCurrency } from './lib/utils';
import { InputSection } from './components/InputSection';
import { ScoreCard } from './components/ScoreCard';
import { TransactionList } from './components/TransactionList';
import { InsightsPanel } from './components/InsightsPanel';
import { FinancesChart } from './components/FinancesChart';
import { analyzeCreditProfile } from './services/intelligenceService';
import { CreditProfile } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, History, Info, Sparkles, Building2 } from 'lucide-react';
import { HistoryList } from './components/HistoryList';
import { saveAssessment, getAssessmentHistory } from './services/dbService';
import { useEffect } from 'react';

export default function App() {
  const [profile, setProfile] = useState<CreditProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const data = await getAssessmentHistory();
    setHistory(data);
  };

  const handleAnalyze = async (logs: string[]) => {
    console.log("Starting analysis for logs:", logs);
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeCreditProfile(logs);
      console.log("Analysis complete:", result);
      setProfile(result);
      
      // Save to Firebase
      try {
        await saveAssessment(result, logs);
        fetchHistory(); // Refresh history list
      } catch (dbErr) {
        console.error("Database sync failed:", dbErr);
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setError('Failed to analyze business patterns. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setProfile(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#3D3D2E] font-sans selection:bg-[#E0DBCF] selection:text-[#3D3D2E]">
      {/* Top Banner */}
      <header className="bg-white border-b border-[#E0DBCF] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5A5A40] rounded-xl flex items-center justify-center shadow-lg shadow-[#5A5A40]/20">
              <div className="w-5 h-5 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight leading-none text-[#3D3D2E]">Amani</h1>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A8A294]">Intelligence</span>
            </div>
          </div>
          
          <nav className="flex items-center gap-6">
            <button 
              onClick={() => setShowHistory(true)}
              className="text-sm font-medium text-[#706B5C] hover:text-[#5A5A40] flex items-center gap-1.5 transition-colors"
            >
              <History className="w-4 h-4" />
              History
            </button>
            <div className="w-px h-4 bg-[#E0DBCF]" />
            <button 
              onClick={handleReset}
              className="text-sm font-bold bg-[#5A5A40] text-white px-4 py-1.5 rounded-full hover:bg-[#4A4A35] transition-colors"
            >
              New Assessment
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Input */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-[#3D3D2E] font-display">Informal Credit <br/>Intelligence.</h2>
              <p className="text-[#706B5C] text-sm leading-relaxed">
                Converting messy business logs into objective financial profiles. Empowering the informal economy with data-driven identity.
              </p>
            </div>
            
            <InputSection onAnalyze={handleAnalyze} isLoading={loading} />
            
            <div className="p-6 bg-white rounded-3xl border border-[#E0DBCF] shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-[#3D3D2E]">
                <Building2 className="w-4 h-4 text-[#8A9A5B]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#A8A294]">Why it matters</span>
              </div>
              <p className="text-xs text-[#706B5C] leading-normal italic font-serif">
                "Traditional records miss the pulse of local markets. Our bridge turns your everyday integrity into global credit worthiness."
              </p>
            </div>
          </div>

          {/* Right Column: Analysis Output */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {profile ? (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ScoreCard 
                      score={profile.score} 
                      riskLevel={profile.riskLevel} 
                      stability={profile.stabilityRating} 
                    />
                    <div className="space-y-4">
                      <div className="bg-white border border-[#E0DBCF] rounded-3xl p-6 shadow-sm h-full flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                          <Info className="w-4 h-4 text-[#8A9A5B]" />
                          <h4 className="text-xs font-bold uppercase tracking-widest text-[#A8A294]">Financial DNA</h4>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between text-xs mb-2">
                              <span className="text-[#706B5C]">Volume Profile</span>
                              <span className="font-bold text-[#8A9A5B]">
                                {formatCurrency(profile.transactions
                                  .filter(t => t.type === 'income')
                                  .reduce((acc, curr) => acc + curr.amount, 0))}
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-[#F2F0EB] rounded-full overflow-hidden">
                              <div className="h-full bg-[#8A9A5B] w-[82%]" />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-2">
                              <span className="text-[#706B5C]">Operational Cost</span>
                              <span className="font-bold text-[#D4A373]">
                                {formatCurrency(profile.transactions
                                  .filter(t => t.type === 'expense')
                                  .reduce((acc, curr) => acc + curr.amount, 0))}
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-[#F2F0EB] rounded-full overflow-hidden">
                              <div className="h-full bg-[#D4A373] w-[45%]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InsightsPanel 
                      insights={profile.insights} 
                      explanation={profile.explanation} 
                    />
                    <FinancesChart transactions={profile.transactions} />
                  </div>

                  <TransactionList transactions={profile.transactions} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-[#E0DBCF] rounded-[32px] bg-white"
                >
                  <div className="w-20 h-20 bg-[#FBF9F7] rounded-full flex items-center justify-center shadow-sm mb-6 border border-[#E0DBCF]">
                    <Sparkles className="w-8 h-8 text-[#A8A294]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#3D3D2E] mb-2 font-display">Ready for Intelligence</h3>
                  <p className="text-sm text-[#706B5C] max-w-xs text-center leading-relaxed">
                    Insert your informal business activity logs to generate behavioral credit insights.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {error && (
        <div className="fixed bottom-6 right-6 bg-rose-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <Info className="w-5 h-5" />
          <span className="text-sm font-medium">{error}</span>
          <button onClick={() => setError(null)} className="ml-2 hover:opacity-70">✕</button>
        </div>
      )}

      {showHistory && (
        <HistoryList 
          history={history} 
          onSelect={setProfile} 
          onClose={() => setShowHistory(false)} 
        />
      )}
    </div>
  );
}
