import React from 'react';
import { 
  TrendUp, 
  TrendDown, 
  CurrencyDollar, 
  Receipt, 
  Briefcase,
  IdentificationCard,
  DotsThreeVertical,
  CaretRight,
  CaretDown,
  CalendarBlank,
  UploadSimple,
  DownloadSimple,
  MagnifyingGlass
} from '@phosphor-icons/react';
import { DashboardData } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DashboardProps {
  data: DashboardData;
  onOpenDateRangePicker?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onOpenDateRangePicker }) => {
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IE', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);

  // Prepare data for the bar chart
  const barChartData = data.chart.map(item => ({
    name: item.month,
    income: item.income,
    expenses: -item.expenses, // Negative for visual comparison as in the original summary
  }));

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
      <div className="max-w-[1240px] mx-auto px-8 py-8 w-full font-aktifo">
        {/* Page Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-[#0F2F33]">Dashboard</h1>
            <div className="h-6 w-px bg-[#E5E7EB]"></div>
            <div 
              onClick={onOpenDateRangePicker}
              className="flex items-center gap-2 h-[36px] bg-white rounded-[6px] transition-colors cursor-pointer"
            >
              <CalendarBlank size={16} className="text-[#9CA3AF]" />
              <span className="text-[13px] text-[#0F2F33] font-medium">This tax year (01.01 → 31.12.2025)</span>
              <CaretDown size={14} weight="fill" className="text-[#0F2F33] ml-1" />
            </div>
          </div>
          <div className="flex items-center gap-2">
              <button className="h-[36px] px-4 bg-[#FFDD33] hover:bg-[#FACC15] text-[#000000] text-[13px] font-medium rounded-[6px] transition-all flex items-center gap-2">
                  <UploadSimple size={16} weight="bold" />
                  Import client data
              </button>
              <button className="h-[36px] px-4 bg-[#FFDD33] hover:bg-[#FACC15] text-[#000000] text-[13px] font-medium rounded-[6px] transition-all flex items-center gap-2">
                  <DownloadSimple size={16} weight="bold" />
                  Export all data
              </button>
              <button className="h-[36px] px-4 bg-[#005A66] hover:bg-[#004D57] text-white text-[13px] font-medium rounded-[6px] transition-all flex items-center gap-2">
                  <MagnifyingGlass size={16} weight="bold" />
                  Scan year-to-date data
              </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Revenue */}
          <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-3">
              <div className="text-[#6B7280] text-[12px] font-medium uppercase tracking-wider">Total Revenue</div>
              <div className="text-[11px] font-bold text-[#059669] bg-[#DCFCE7] px-2 py-0.5 rounded-full">+12.5%</div>
            </div>
            <div className="text-[22px] font-bold text-[#111827]">{formatCurrency(data.kpi.income)}</div>
          </div>

          {/* Total Expenses */}
          <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-3">
              <div className="text-[#6B7280] text-[12px] font-medium uppercase tracking-wider">Total Costs</div>
              <div className="text-[11px] font-bold text-[#E11D48] bg-[#FFE4E6] px-2 py-0.5 rounded-full">-4.2%</div>
            </div>
            <div className="text-[22px] font-bold text-[#111827]">{formatCurrency(data.kpi.expenses)}</div>
          </div>

          {/* Net Profit */}
          <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-3">
              <div className="text-[#6B7280] text-[12px] font-medium uppercase tracking-wider">Net Profit</div>
            </div>
            <div className="text-[22px] font-bold text-[#005A66]">{formatCurrency(data.kpi.profit)}</div>
          </div>

          {/* VAT Liability */}
          <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-3">
              <div className="text-[#6B7280] text-[12px] font-medium uppercase tracking-wider">VAT Estimate</div>
            </div>
            <div className="text-[22px] font-bold text-[#111827]">{formatCurrency(data.kpi.vatEstimate)}</div>
          </div>
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Summary Bar Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-[16px] font-bold text-[#111827]">Summary</h3>
                <p className="text-[#6B7280] text-[12px]">Financial performance comparison</p>
              </div>
              <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm bg-[#FFDD33]"></div>
                      <span className="text-[11px] text-[#6B7280] font-medium uppercase tracking-wider">Income</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm bg-[#E5E7EB]"></div>
                      <span className="text-[11px] text-[#6B7280] font-medium uppercase tracking-wider">Expenses</span>
                  </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={0}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#FAFAFA" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 11 }}
                    dy={8}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 11 }}
                    tickFormatter={(value) => value < 0 ? `-€${Math.abs(value).toLocaleString()}` : `€${value.toLocaleString()}`}
                  />
                  <Tooltip 
                    cursor={{ fill: '#F9FAFB' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                    formatter={(value: number) => [formatCurrency(Math.abs(value)), value > 0 ? 'Income' : 'Expenses']}
                  />
                  <Bar dataKey="income" fill="#FFDD33" radius={[4, 4, 0, 0]} barSize={40} />
                  <Bar dataKey="expenses" fill="#E5E7EB" radius={[0, 0, 4, 4]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[16px] font-bold text-[#111827]">Expense Structure</h3>
                  <button className="text-[#D1D5DB] hover:text-[#374151]"><DotsThreeVertical size={20} /></button>
              </div>
              <div className="h-[180px] mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                          <Pie
                              data={data.categoryBreakdown}
                              innerRadius={60}
                              outerRadius={75}
                              paddingAngle={3}
                              dataKey="value"
                              stroke="none"
                          >
                              {data.categoryBreakdown.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                          </Pie>
                          <Tooltip />
                      </PieChart>
                  </ResponsiveContainer>
              </div>
              <div className="space-y-2.5">
                  {data.categoryBreakdown.map((cat, i) => (
                      <div key={i} className="flex items-center justify-between group">
                          <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></div>
                              <span className="text-[12px] font-medium text-[#4B5563] group-hover:text-[#111827] transition-colors">{cat.label}</span>
                          </div>
                          <div className="flex items-center gap-3">
                              <span className="text-[11px] font-normal text-[#9CA3AF]">{cat.percentage}%</span>
                              <span className="text-[12px] font-bold text-[#111827]">{formatCurrency(cat.value)}</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Outstanding Invoices */}
          <div className="lg:col-span-3 bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-[16px] font-bold text-[#111827]">Outstanding Invoices</h3>
                <p className="text-[#6B7280] text-[12px]">Receivables and aging</p>
              </div>
              <button className="text-[12px] font-bold text-[#005A66] flex items-center gap-1 hover:underline">
                  View All <CaretRight size={12} />
              </button>
            </div>
            
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left">
                  <thead>
                      <tr className="text-[#9CA3AF] text-[11px] font-bold uppercase tracking-wider border-b border-[#F9FAFB]">
                          <th className="pb-3 font-bold">Customer</th>
                          <th className="pb-3 font-bold">Due Date</th>
                          <th className="pb-3 font-bold">Amount</th>
                          <th className="pb-3 font-bold text-center">Status</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F9FAFB]">
                      {data.recentInvoices.map((inv) => (
                          <tr key={inv.id} className="group hover:bg-[#FAFAFA] transition-colors">
                              <td className="py-3">
                                  <span className="text-[13px] font-bold text-[#111827]">{inv.customer}</span>
                              </td>
                              <td className="py-3">
                                  <span className="text-[12px] text-[#6B7280]">{inv.date}</span>
                              </td>
                              <td className="py-3">
                                  <span className="text-[13px] font-black text-[#111827]">{formatCurrency(inv.amount)}</span>
                              </td>
                              <td className="py-3 text-center">
                                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold tracking-tight ${
                                      inv.status === 'Paid' ? 'bg-[#DCFCE7] text-[#059669]' :
                                      inv.status === 'Due' ? 'bg-[#FFF1F2] text-[#E11D48]' :
                                      'bg-[#FEFCE8] text-[#A16207]'
                                  }`}>
                                      {inv.status}
                                  </span>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
