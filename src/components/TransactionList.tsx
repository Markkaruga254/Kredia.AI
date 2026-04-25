import { Transaction } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-white border border-[#E0DBCF] rounded-[32px] overflow-hidden shadow-sm">
      <div className="px-8 py-5 border-b border-[#EEECE6] bg-[#FBF9F7] flex justify-between items-center">
        <h3 className="font-bold text-[#3D3D2E] text-xs uppercase tracking-widest leading-none">Financial Ledger</h3>
        <span className="text-[10px] bg-[#F4F6EE] text-[#8A9A5B] px-3 py-1 rounded-full font-black uppercase border border-[#8A9A5B]/20 tracking-widest">
          {transactions.length} Entries extracted
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#EEECE6]">
              <th className="px-8 py-4 text-[10px] font-bold text-[#A8A294] uppercase tracking-widest">Source Trace</th>
              <th className="px-8 py-4 text-[10px] font-bold text-[#A8A294] uppercase tracking-widest text-right">Value</th>
              <th className="px-8 py-4 text-[10px] font-bold text-[#A8A294] uppercase tracking-widest">Entity</th>
              <th className="px-8 py-4 text-[10px] font-bold text-[#A8A294] uppercase tracking-widest text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEECE6]">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-[#FBF9F7] transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#3D3D2E] capitalize italic font-serif">"{tx.rawText}"</span>
                    <div className="flex items-center gap-1.5 mt-1 text-[10px] text-[#A8A294] font-bold uppercase tracking-wider">
                      <Clock className="w-3 h-3" />
                      {format(new Date(tx.timestamp), 'MMM d, h:mm a')}
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <span className={cn(
                    "text-sm font-mono font-bold",
                    tx.type === 'income' ? 'text-[#8A9A5B]' : 'text-[#3D3D2E]'
                  )}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-[10px] font-bold text-[#706B5C] bg-[#F2F0EB] px-2.5 py-1 rounded-lg border border-[#E0DBCF] uppercase tracking-widest">
                    {tx.category}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <div className={cn(
                    "flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em]",
                    tx.type === 'income' ? 'text-[#8A9A5B]' : 'text-[#A65E4E]'
                  )}>
                    {tx.type === 'income' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownLeft className="w-3 h-3" />}
                    {tx.type}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
