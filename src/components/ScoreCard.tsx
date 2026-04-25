import { motion } from 'motion/react';
import { ShieldCheck, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ScoreCardProps {
  score: number;
  riskLevel: string;
  stability: string;
}

export function ScoreCard({ score, riskLevel, stability }: ScoreCardProps) {
  const getScoreColor = (s: number) => {
    if (s >= 750) return 'text-[#8A9A5B]';
    if (s >= 650) return 'text-[#5A5A40]';
    if (s >= 500) return 'text-[#D4A373]';
    return 'text-[#A65E4E]';
  };

  const scorePercentage = ((score - 300) / (850 - 300)) * 100;

  return (
    <div className="bg-white border border-[#E0DBCF] rounded-[40px] p-10 relative overflow-hidden shadow-sm">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A8A294]">Credit Rating</span>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-baseline gap-1"
            >
              <h3 className={cn("text-7xl font-bold tracking-tighter mt-1", getScoreColor(score))}>
                {score}
              </h3>
            </motion.div>
          </div>
          <div className={cn(
            "px-4 py-1.5 rounded-full text-[10px] font-bold border uppercase tracking-widest flex items-center gap-2",
            riskLevel.toLowerCase() === 'low' ? 'bg-[#F4F6EE] border-[#8A9A5B]/30 text-[#8A9A5B]' :
            riskLevel.toLowerCase() === 'medium' ? 'bg-[#FEFAF2] border-[#D4A373]/30 text-[#D4A373]' :
            'bg-[#F9F1F0] border-[#A65E4E]/30 text-[#A65E4E]'
          )}>
            {riskLevel.toLowerCase() === 'low' ? <ShieldCheck className="w-3 h-3" /> :
             riskLevel.toLowerCase() === 'medium' ? <TrendingUp className="w-3 h-3" /> :
             <AlertCircle className="w-3 h-3" />}
            {riskLevel} Risk
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-2 bg-[#F2F0EB] rounded-full overflow-hidden flex">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${scorePercentage}%` }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className={cn("h-full rounded-full", 
                score >= 750 ? 'bg-[#8A9A5B]' :
                score >= 650 ? 'bg-[#5A5A40]' :
                score >= 500 ? 'bg-[#D4A373]' :
                'bg-[#A65E4E]'
              )}
            />
          </div>
          <div className="flex justify-between text-[10px] font-bold text-[#A8A294] uppercase tracking-[0.2em]">
            <span>300</span>
            <span className="opacity-40">Average: 640</span>
            <span>850</span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="p-4 bg-[#FBF9F7] rounded-2xl border border-[#EEECE6]">
            <p className="text-[10px] uppercase tracking-wider font-bold text-[#A8A294] mb-1">Stability</p>
            <p className="font-bold text-[#3D3D2E] text-sm uppercase tracking-wide">{stability}</p>
          </div>
          <div className="p-4 bg-[#FBF9F7] rounded-2xl border border-[#EEECE6]">
            <p className="text-[10px] uppercase tracking-wider font-bold text-[#A8A294] mb-1">Lender Verdict</p>
            <p className={cn("font-bold text-sm uppercase tracking-wide", 
              score >= 700 ? 'text-[#8A9A5B]' : 'text-[#706B5C]'
            )}>
              {score >= 700 ? 'Tier 1 Prime' : 'Review Required'}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative gauge behind */}
      <div className="absolute -right-24 -bottom-24 opacity-[0.03] pointer-events-none">
        <div className="w-80 h-80 border-[40px] border-[#5A5A40] rounded-full" />
      </div>
    </div>
  );
}
