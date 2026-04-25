import React, { useState } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface InputSectionProps {
  onAnalyze: (logs: string[]) => void;
  isLoading: boolean;
}

export function InputSection({ onAnalyze, isLoading }: InputSectionProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit clicked, text length:", text.length);
    if (isLoading) return;
    
    if (!text.trim()) {
      alert("Please provide some business logs first.");
      return;
    }
    
    // Split by new line, remove empty lines
    const logs = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    console.log("Extracted logs:", logs);
    onAnalyze(logs);
  };

  return (
    <div className="bg-white border border-[#E0DBCF] rounded-[32px] p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-[#FBF9F7] rounded-xl border border-[#EEECE6]">
          <Sparkles className="w-5 h-5 text-[#5A5A40]" />
        </div>
        <div>
          <h2 className="font-bold text-[#3D3D2E] tracking-tight uppercase text-xs tracking-widest">Amani Feed</h2>
          <p className="text-[10px] text-[#A8A294] font-bold uppercase tracking-widest">Informal activity input</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g.&#10;Sold fish for 2000&#10;No sales today&#10;Bought stock for 500"
          className="w-full h-40 p-4 text-sm bg-[#FBF9F7] border border-[#EEECE6] text-[#3D3D2E] rounded-2xl focus:ring-1 focus:ring-[#8A9A5B] focus:border-[#8A9A5B] transition-all resize-none outline-none font-mono"
        />
        
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-4 bg-[#5A5A40] text-white rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:bg-[#4A4A35] active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-[#5A5A40]/20 cursor-pointer",
            isLoading && "bg-[#5A5A40] cursor-wait"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Mapping Data...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Verify Pipeline</span>
            </>
          )}
        </button>
      </form>
      
      <div className="mt-6 pt-6 border-t border-[#EEECE6]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#A8A294]">Example Traces</p>
          <button
            type="button"
            onClick={() => setText(`Sold fish for 2000 KES
Bought stock for 1500 KES
Rent paid 5000
Daily sales 3200
Bought charcoal 200
No sales recorded yesterday
Collected debt 1000 KES`)}
            className="text-[10px] font-bold text-[#8A9A5B] hover:text-[#5A5A40] uppercase tracking-widest transition-colors"
          >
            Full Profile Sample
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Sold 500", "Spent 200"].map(example => (
            <button
              key={example}
              onClick={() => setText(prev => prev + (prev ? '\n' : '') + example)}
              className="text-[10px] px-2.5 py-1 bg-[#FBF9F7] hover:bg-[#F2F0EB] text-[#706B5C] rounded-lg border border-[#EEECE6] transition-colors font-bold uppercase tracking-wider"
            >
              + {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
