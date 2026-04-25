import { BehavioralInsights } from '../types';
import { Brain, Quote, Target, Waves, Activity } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface InsightsPanelProps {
  insights: BehavioralInsights;
  explanation: string;
}

export function InsightsPanel({ insights, explanation }: InsightsPanelProps) {
  const metrics = [
    { 
      label: 'Consistency', 
      value: `${insights.consistencyScore}%`, 
      icon: Activity,
      desc: 'Frequency of recorded sales/purchases'
    },
    { 
      label: 'Stability', 
      value: insights.stabilityRating, 
      icon: Waves,
      desc: 'Income volatility over the period'
    },
    { 
      label: 'Frequency', 
      value: insights.earningFrequency, 
      icon: Target,
      desc: 'Average time between income'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white border border-[#E0DBCF] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 bg-[#FBF9F7] rounded-lg border border-[#EEECE6]">
                <m.icon className="w-4 h-4 text-[#5A5A40]" />
              </div>
              <span className="text-sm font-bold text-[#3D3D2E]">{m.value}</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#A8A294]">{m.label}</p>
            <p className="text-[10px] text-[#706B5C] mt-1">{m.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#5A5A40] rounded-[32px] overflow-hidden shadow-xl shadow-[#5A5A40]/10 text-white">
        <div className="p-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2 bg-[#4A4A35] rounded-xl">
              <Brain className="w-5 h-5 text-[#8A9A5B]" />
            </div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-[#B0B09E]">Humanized Narrative</h3>
          </div>

          <div className="relative">
            <Quote className="absolute -left-4 -top-4 w-12 h-12 text-[#4A4A35] -scale-x-100 opacity-50" />
            <div className="prose prose-invert prose-sm text-white/90 max-w-none italic leading-relaxed text-lg font-serif">
              <ReactMarkdown>{explanation}</ReactMarkdown>
            </div>
          </div>
        </div>
        
        <div className="bg-[#4A4A35] px-10 py-6 border-t border-white/5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-[#B0B09E] uppercase tracking-widest">Behavioral DNA</p>
            <p className="text-xs font-medium text-white/70 italic">{insights.spendingPattern}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
