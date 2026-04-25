import React from 'react';
import { CreditProfile } from '../types';
import { formatCurrency } from '../lib/utils';
import { Clock, ChevronRight, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface HistoryListProps {
  history: any[]; // Using any to handle Firebase structure
  onSelect: (profile: CreditProfile) => void;
  onClose: () => void;
}

export function HistoryList({ history, onSelect, onClose }: HistoryListProps) {
  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-md h-full bg-[#F7F5F2] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-[#E0DBCF] bg-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#3D3D2E]">Assessment History</h2>
            <p className="text-[10px] text-[#A8A294] font-bold uppercase tracking-widest">Past Intelligence Traces</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#FBF9F7] rounded-full transition-colors text-[#706B5C]"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <Clock className="w-12 h-12 text-[#A8A294]" />
              <p className="text-sm font-medium text-[#706B5C]">No history found yet.<br/>Start an assessment to begin tracking.</p>
            </div>
          ) : (
            history.map((profile, index) => {
              const income = profile.transactions
                .filter((t: any) => t.type === 'income')
                .reduce((acc: number, curr: any) => acc + curr.amount, 0);
              
              // Handle Firebase Timestamp
              const date = profile.createdAt?.toDate ? profile.createdAt.toDate() : new Date();
              
              return (
                <button
                  key={profile.id || index}
                  onClick={() => {
                    onSelect(profile);
                    onClose();
                  }}
                  className="w-full text-left bg-white border border-[#E0DBCF] rounded-2xl p-4 hover:border-[#8A9A5B] hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#FBF9F7] flex items-center justify-center text-[10px] font-bold text-[#8A9A5B] border border-[#EEECE6]">
                        {profile.score}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#3D3D2E]">
                          {profile.riskLevel} Risk Assessment
                        </p>
                        <p className="text-[9px] text-[#A8A294] uppercase tracking-wider font-bold">
                          {format(date, 'MMM d, yyyy • h:mm a')}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#E0DBCF] group-hover:text-[#8A9A5B] transition-colors" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[#FBF9F7]">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3 h-3 text-[#8A9A5B]" />
                      <span className="text-[10px] font-bold text-[#706B5C]">{formatCurrency(income)}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <AlertCircle className="w-3 h-3 text-[#D4A373]" />
                      <span className="text-[10px] font-bold text-[#706B5C] capitalize">{profile.stabilityRating} Stability</span>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
        
        <div className="p-6 bg-white border-t border-[#E0DBCF]">
          <p className="text-[9px] text-[#A8A294] text-center font-bold uppercase tracking-[0.2em]">
            History synced with Firebase Firestore
          </p>
        </div>
      </div>
    </div>
  );
}
