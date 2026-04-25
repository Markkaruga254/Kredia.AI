import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Transaction } from '../types';
import { formatCurrency } from '../lib/utils';

interface FinancesChartProps {
  transactions: Transaction[];
}

export function FinancesChart({ transactions }: FinancesChartProps) {
  // Group transactions by category and sum income vs expense
  const categoryDataMap = transactions.reduce((acc, tx) => {
    if (!acc[tx.category]) {
      acc[tx.category] = { category: tx.category, income: 0, expense: 0 };
    }
    if (tx.type === 'income') acc[tx.category].income += tx.amount;
    else acc[tx.category].expense += tx.amount;
    return acc;
  }, {} as Record<string, { category: string, income: number, expense: number }>);

  const data = Object.values(categoryDataMap);

  return (
    <div className="bg-white border border-[#E0DBCF] rounded-3xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="font-bold text-[#3D3D2E] text-xs uppercase tracking-widest leading-none">Net Analysis</h3>
          <p className="text-[10px] text-[#A8A294] font-bold uppercase tracking-widest mt-2 px-2 py-0.5 bg-[#FBF9F7] rounded-md inline-block">Pattern Mapping</p>
        </div>
      </div>

      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEECE6" />
            <XAxis 
              dataKey="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 9, fill: '#A8A294', fontWeight: 700, textAnchor: 'middle' }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 9, fill: '#A8A294', fontWeight: 700 }}
            />
            <Tooltip 
              cursor={{ fill: '#FBF9F7' }}
              contentStyle={{ 
                borderRadius: '16px', 
                border: '1px solid #E0DBCF', 
                boxShadow: '0 4px 12px -2px rgb(61 61 46 / 0.05)',
                fontSize: '11px',
                backgroundColor: '#FBF9F7',
                color: '#3D3D2E',
                fontWeight: 'bold'
              }}
              itemStyle={{ color: '#3D3D2E' }}
              formatter={(value: number) => [formatCurrency(value), '']}
            />
            <Bar dataKey="income" fill="#8A9A5B" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="expense" fill="#D4A373" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 mt-8 pt-6 border-t border-[#F2F0EB]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#8A9A5B] rounded-full" />
          <span className="text-[10px] font-bold text-[#706B5C] uppercase tracking-widest">Inflows</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#D4A373] rounded-full" />
          <span className="text-[10px] font-bold text-[#706B5C] uppercase tracking-widest">Outflows</span>
        </div>
      </div>
    </div>
  );
}
