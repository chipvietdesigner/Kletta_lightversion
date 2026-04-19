import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { ExpenseTransaction } from '../types';
import { 
  CheckCircle,
  FileText, 
  SealCheck, 
  Trash, 
  CaretDown, 
  ArrowsDownUp,
  Storefront,
  Car,
  Users,
  Buildings,
  Wrench,
  Gavel,
  CreditCard,
  Phone as PhoneIcon,
  Archive,
  WarningCircle,
  Bank,
  User as UserIcon,
  Money,
  Check,
  X,
  PlusCircle,
  Briefcase,
  FileSearch,
  Pencil,
  MagnifyingGlass,
  Funnel,
  CalendarBlank,
  Plus,
  UploadSimple
} from '@phosphor-icons/react';

interface ExpensesTableProps {
  transactions: ExpenseTransaction[];
}

interface CategoryOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: 'c1', label: 'Costs of goods bought for resale or goods used', description: 'Inventory and cost of sales', icon: 'storefront' },
  { id: 'c2', label: 'Car, van and travel expenses', description: 'Fuel, maintenance, travel', icon: 'directions_car' },
  { id: 'c3', label: 'Wages, salaries and other staff costs', description: 'Employee related expenses', icon: 'group' },
  { id: 'c4', label: 'Rent, rates, power and insurance costs', description: 'Office and facility costs', icon: 'apartment' },
  { id: 'c5', label: 'Repairs and maintenance of property and equipment', description: 'Fixing business assets', icon: 'build' },
  { id: 'c6', label: 'Accountancy, legal and other professional fees', description: 'Professional service fees', icon: 'gavel' },
  { id: 'c7', label: 'Interest and bank and credit card financial charges', description: 'Financial fees and interest', icon: 'credit_card' },
  { id: 'c8', label: 'Phone, fax, stationery and other office costs', description: 'Comm. and office supplies', icon: 'phone' },
  { id: 'c9', label: 'Other allowable business expenses', description: 'Misc business costs', icon: 'archive' },
  { id: 'c10', label: 'Non-allowable business expenses', description: 'Not tax deductible', icon: 'warning' },
  { id: 'c11', label: 'Withdrawal, transfer and credit card', description: 'Money movement', icon: 'account_balance' },
  { id: 'c12', label: 'Business owner wages', description: 'Owner drawings', icon: 'person' },
  { id: 'c13', label: 'Capital', description: 'Large asset purchases', icon: 'payments' },
];

const VAT_OPTIONS = [
  "0%",
  "Standard rate - 20%",
  "Reduced rate - 5%",
  "Zero rated - 0%",
  "Exempt - 0%",
  "No VAT - 0%"
];

const ExpensesTable: React.FC<ExpensesTableProps> = ({ transactions: initialTransactions }) => {
  const [transactions, setTransactions] = useState<ExpenseTransaction[]>(initialTransactions);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [hoveredColKey, setHoveredColKey] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [taxRateDropdownId, setTaxRateDropdownId] = useState<string | null>(null);
  const [selectedVat, setSelectedVat] = useState<string | null>(null);
  const [dropdownCoords, setDropdownCoords] = useState<{ top: number, left: number } | null>(null);
  const [manuallyReconciledRows, setManuallyReconciledRows] = useState<Set<string>>(new Set());
  
  const [modifiedCells, setModifiedCells] = useState<Set<string>>(new Set());
  const [taxSearch, setTaxSearch] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const vatDropdownRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  useEffect(() => {
    setTransactions(initialTransactions);
    setModifiedCells(new Set());
  }, [initialTransactions]);

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);

  const calculateTotals = () => {
    const subtotal = transactions.reduce((sum, t) => sum + t.subtotal, 0);
    const vat = transactions.reduce((sum, t) => sum + t.vat, 0);
    const total = transactions.reduce((sum, t) => sum + t.totalAmount, 0);
    return { subtotal, vat, total };
  };
  
  const totals = calculateTotals();

  const groupedTransactions = transactions.reduce((groups: { [key: string]: ExpenseTransaction[] }, t) => {
    const parts = t.date.split('.');
    const date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    if (!groups[monthYear]) groups[monthYear] = [];
    groups[monthYear].push(t);
    return groups;
  }, {});

  const groupKeys = Object.keys(groupedTransactions).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });

  const handleUpdateTransaction = (id: string, updates: Partial<ExpenseTransaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    
    const keys = Object.keys(updates);
    if (keys.length > 0) {
      setModifiedCells(prev => {
        const next = new Set(prev);
        keys.forEach(key => next.add(`${id}-${key}`));
        return next;
      });
    }
  };

  const handleSaveAll = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setHoveredRowId(null);
    setHoveredColKey(null);
    setOpenDropdownId(null);
    setTaxRateDropdownId(null);
    setModifiedCells(new Set());
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
      if (vatDropdownRef.current && !vatDropdownRef.current.contains(event.target as Node)) {
        setTaxRateDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useLayoutEffect(() => {
    if (taxRateDropdownId && triggerRefs.current[taxRateDropdownId]) {
      const updatePosition = () => {
        const trigger = triggerRefs.current[taxRateDropdownId!];
        if (trigger) {
          const rect = trigger.getBoundingClientRect();
          setDropdownCoords({
            top: rect.bottom + 8,
            left: rect.left - 120,
          });
        }
      };

      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    } else {
      setDropdownCoords(null);
    }
  }, [taxRateDropdownId]);

  const handleApplyVat = () => {
    if (taxRateDropdownId && selectedVat) {
        handleUpdateTransaction(taxRateDropdownId, { taxRate: selectedVat });
    }
    setTaxRateDropdownId(null);
    handleSaveAll();
  };

  const getCategoryIcon = (category: string) => {
    const opt = CATEGORY_OPTIONS.find(o => o.label === category);
    return opt ? opt.icon : 'work';
  };

  const handleManualReconcile = (id: string) => {
    setManuallyReconciledRows(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const renderReconciliationPill = (t: ExpenseTransaction, index: number) => {
    if (!t.reconciled && !manuallyReconciledRows.has(t.id)) {
      return (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleManualReconcile(t.id);
          }}
          className="h-[24px] px-2.5 rounded-[8px] border border-[#B5B5B5] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors group/plus"
        >
          <Plus size={12} className="mr-1 text-[#000000]" />
          <span className="text-[12px] font-medium text-[#000000]">Cash</span>
        </button>
      );
    }

    const isCash = index % 3 === 0 || manuallyReconciledRows.has(t.id);

    if (isCash) {
      return (
        <div className="inline-flex items-center gap-1.5 bg-transparent">
          <CheckCircle size={16} weight="fill" className="text-[#1D9E75]" />
          <span className="text-[13px] font-normal text-[#000000]">Cash</span>
        </div>
      );
    }

    return (
      <div className="inline-flex items-center gap-1.5 bg-transparent">
        <CheckCircle size={16} weight="fill" className="text-[#1D9E75]" />
        <span className="text-[13px] font-normal text-[#000000]">Transaction {62000 + index}</span>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col flex-1 overflow-hidden mt-0 bg-white border border-[#E5E5E0] rounded-xl">
      <div className="overflow-auto flex-1 custom-scrollbar flex flex-col bg-white">
        <table className="text-left table-fixed w-full border-collapse bg-white">
          <thead className="bg-[#F9FAFB] text-[#000000] sticky top-0 z-50 shadow-sm">
            <tr className="border-b border-[#E5E7EB] h-[62px]">
              <th className="px-4 py-3 font-medium text-[12px] w-[154px] text-left align-top">
                <div className="flex items-center gap-1 mb-1">
                  <span>Total amount</span>
                  <ArrowsDownUp size={12} className="text-[#000000]" />
                </div>
                <div className="text-[13px] font-bold text-[#005A66]">{formatCurrency(totals.total)}</div>
              </th>

              <th className="px-4 py-3 font-medium text-[12px] w-[110px] text-left align-middle">
                <span>Document</span>
              </th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[242px] text-left align-middle">
                <div className="flex items-center gap-1">
                  <span>Category</span>
                  <ArrowsDownUp size={12} className="text-[#000000]" />
                </div>
              </th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[121px] text-left align-middle">
                <div className="flex items-center gap-1">
                  <span>Date</span>
                  <ArrowsDownUp size={12} className="text-[#000000]" />
                </div>
              </th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[220px] text-left align-middle">
                <div className="flex items-center gap-1">
                  <span>Supplier</span>
                  <ArrowsDownUp size={12} className="text-[#000000]" />
                </div>
              </th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[132px] text-left align-middle">Receipt ID</th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[198px] text-left align-middle">Reconciled</th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[220px] text-left align-middle">Tax rate</th>

              <th className="px-4 py-3 font-medium text-[12px] w-[88px] text-center align-middle">VAT%</th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[110px] text-right align-middle">VAT</th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[132px] text-right align-middle">
                <div className="flex items-center justify-end gap-1">
                  <span>Subtotal</span>
                  <ArrowsDownUp size={12} className="text-[#000000]" />
                </div>
              </th>
              
              <th className="px-4 py-3 font-medium text-[12px] w-[77px] text-center align-middle">Verified</th>
              <th className="px-4 py-3 font-medium text-[12px] w-[88px] text-center align-middle">AI Verified</th>
              <th className="px-4 py-3 font-medium text-[12px] w-[66px] text-center align-middle">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {groupKeys.map((groupKey) => (
              <React.Fragment key={groupKey}>
                {/* Group Header */}
                <tr className="bg-[#EFF4F5] h-[32px] border-b border-[#E5E7EB] sticky top-[62px] z-40">
                  <td colSpan={14} className="px-4 py-0 align-middle bg-[#EFF4F5]">
                    <span className="text-[13px] font-bold text-[#111827]">{groupKey}</span>
                  </td>
                </tr>

                {groupedTransactions[groupKey].map((t, index) => {
                  const isRowHovered = hoveredRowId === t.id;
                  const isDropdownOpen = openDropdownId === t.id;
                  const isTaxRateOpen = taxRateDropdownId === t.id;
                  
                  const isCellEditable = (colKey: string) => isRowHovered && hoveredColKey === colKey;
                  const bgClass = isRowHovered ? 'bg-[#FAFAF8]' : 'bg-white';

                  return (
                    <tr 
                      key={t.id} 
                      className={`group transition-all h-[44px] border-b border-[#E5E7EB] last:border-0 ${bgClass}`} 
                      onMouseEnter={() => setHoveredRowId(t.id)} 
                      onMouseLeave={() => { setHoveredRowId(null); setHoveredColKey(null); }}
                    >
                      {/* Total Amount */}
                      <td className="p-0" onMouseEnter={() => setHoveredColKey('totalAmount')}>
                        <div className="h-full flex items-center justify-start px-4 relative">
                          {isCellEditable('totalAmount') ? (
                            <div className="relative w-full">
                               <input 
                                 type="number"
                                 value={t.totalAmount}
                                 onChange={(e) => handleUpdateTransaction(t.id, { totalAmount: parseFloat(e.target.value) || 0 })}
                                 className="w-full h-[32px] px-2 bg-white border border-[#B5B5B5] rounded-[8px] text-[13px] font-semibold text-[#111827] focus:outline-none"
                               />
                            </div>
                          ) : (
                            <span className="font-semibold text-[#111827] text-[14px]">{formatCurrency(t.totalAmount)}</span>
                          )}
                        </div>
                      </td>

                      {/* Document */}
                      <td className="p-0">
                        <div className="h-full flex items-center px-4">
                          {t.document ? (
                            <div className="w-[24px] h-[32px] rounded border border-[#E5E7EB] overflow-hidden bg-[#f9fafb] cursor-pointer">
                              <img 
                                src={t.document} 
                                alt="Receipt"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          ) : (
                            <span className="text-[#D1D5DB]">—</span>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-0 relative" onMouseEnter={() => setHoveredColKey('category')}>
                        <div 
                          className="h-full flex items-center px-4 cursor-pointer relative group/cat"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(isDropdownOpen ? null : t.id);
                          }}
                        >
                          <div className="flex items-center gap-2 hover:underline decoration-[#D1D5DB] underline-offset-4 overflow-hidden">
                            <span className="material-symbols-outlined text-[#000000] flex-shrink-0" style={{ fontSize: '18px' }}>{getCategoryIcon(t.category)}</span>
                            <span className="text-[#000000] text-[13px] font-normal truncate">{t.category}</span>
                            <CaretDown size={10} className="text-[#000000] ml-1 flex-shrink-0" />
                          </div>

                          {isDropdownOpen && (
                            <div 
                              ref={dropdownRef}
                              className="absolute top-[calc(100%+4px)] left-0 w-[360px] bg-white rounded-lg shadow-xl border border-[#E5E7EB] max-h-[400px] overflow-y-auto z-[100] flex flex-col"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex flex-col p-2">
                                  {CATEGORY_OPTIONS.map((option) => (
                                    <button
                                      key={option.id}
                                      onClick={() => {
                                        handleUpdateTransaction(t.id, { category: option.label });
                                        setOpenDropdownId(null);
                                        handleSaveAll();
                                      }}
                                      className="w-full rounded-md px-3 py-2 flex items-center gap-3 hover:bg-[#F3F4F6] text-left transition-colors"
                                    >
                                      <span className="material-symbols-outlined text-[#000000]" style={{ fontSize: '18px' }}>{option.icon}</span>
                                      <span className="text-[13px] text-[#000000]">{option.label}</span>
                                    </button>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="p-0" onMouseEnter={() => setHoveredColKey('date')}>
                        <div className="h-full flex items-center px-4 relative">
                          <span className="text-[#000000] text-[13px] font-normal">{t.date}</span>
                        </div>
                      </td>

                      {/* Supplier */}
                      <td className="p-0" onMouseEnter={() => setHoveredColKey('customer')}>
                        <div className="h-full flex items-center px-4 relative overflow-hidden">
                          <span className="text-[#000000] text-[13px] font-normal truncate">{t.customer}</span>
                        </div>
                      </td>

                      {/* Receipt ID */}
                      <td className="p-0" onMouseEnter={() => setHoveredColKey('receipt')}>
                        <div className="h-full flex items-center px-4 relative">
                          <span className="text-[#000000] text-[12px] font-normal truncate">{t.receipt}</span>
                        </div>
                      </td>

                      {/* Reconciled */}
                      <td className="p-0">
                        <div className="h-full flex items-center px-4">
                          {renderReconciliationPill(t, index)}
                        </div>
                      </td>

                      {/* Tax Rate */}
                      <td className="p-0" onMouseEnter={() => setHoveredColKey('taxRate')}>
                        <div 
                          ref={el => triggerRefs.current[t.id] = el}
                          className="h-full flex items-center px-4 cursor-pointer group/tax"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTaxRateDropdownId(isTaxRateOpen ? null : t.id);
                            setSelectedVat(t.taxRate);
                          }}
                        >
                          <div className="flex items-center gap-1 hover:underline decoration-[#D1D5DB] underline-offset-4 overflow-hidden">
                            <span className="text-[#000000] text-[13px] font-normal truncate">
                              {t.taxRate}
                            </span>
                            <CaretDown size={10} className="text-[#000000] flex-shrink-0" />
                          </div>
                        </div>
                      </td>

                      {/* VAT% */}
                      <td className="p-0 text-center">
                        <div className="h-full flex items-center justify-center px-4">
                          <span className="text-[#D1D5DB]">—</span>
                        </div>
                      </td>

                      {/* VAT */}
                      <td className="p-0 text-right">
                        <div className="h-full flex items-center justify-end px-4">
                          <span className="text-[#000000] font-normal text-[13px]">{formatCurrency(t.vat)}</span>
                        </div>
                      </td>

                      {/* Subtotal */}
                      <td className="p-0 text-right" onMouseEnter={() => setHoveredColKey('subtotal')}>
                        <div className="h-full flex items-center justify-end px-4 relative">
                          <span className="text-[#111827] font-semibold text-[13px]">{formatCurrency(t.subtotal)}</span>
                        </div>
                      </td>

                      {/* Verified */}
                      <td className="p-0 text-center">
                        <div className="h-full flex items-center justify-center px-4">
                          <div className={`w-4 h-4 rounded-full border-[1.5px] transition-colors cursor-pointer ${t.verified ? 'bg-[#1D9E75] border-[#1D9E75]' : 'border-[#D1D5DB] hover:border-[#9CA3AF] bg-transparent'}`}>
                            {t.verified && <Check size={10} weight="bold" className="text-white m-auto" />}
                          </div>
                        </div>
                      </td>

                      {/* AI Verified */}
                      <td className="p-0 text-center">
                        <div className="h-full flex items-center justify-center px-4">
                          {t.aiVerified ? (
                            <SealCheck size={18} weight="fill" className="text-[#1D9E75]" />
                          ) : (
                            <span className="text-[#D1D5DB]">—</span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-0 text-center">
                        <div className="h-full flex items-center justify-center px-4">
                          <Pencil 
                            size={16} 
                            className={`text-[#000000] cursor-pointer transition-opacity ${isRowHovered ? 'opacity-100' : 'opacity-40'}`} 
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {transactions.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-[#F9F9F8] rounded-full flex items-center justify-center mb-4">
              <FileSearch size={32} className="text-[#9CA3AF]" />
            </div>
            <h3 className="text-[16px] font-medium text-[#000000] mb-1">No expenses found</h3>
            <p className="text-[13px] text-[#616A6B]">There are no records to display for this period.</p>
          </div>
        )}
      </div>

      {taxRateDropdownId && dropdownCoords && createPortal(
        <div 
          ref={vatDropdownRef}
          style={{ 
            position: 'fixed',
            top: dropdownCoords.top,
            left: dropdownCoords.left,
            zIndex: 9999
          }}
          className="w-[340px] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-3 border-b border-[#F3F4F6]">
            <div className="relative">
              <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input 
                type="text"
                placeholder="Search tax rate..."
                value={taxSearch}
                onChange={(e) => setTaxSearch(e.target.value)}
                className="w-full h-[36px] pl-9 pr-3 bg-[#F9FAFB] border border-[#B5B5B5] rounded-[8px] text-[13px] focus:outline-none focus:border-[#FFDD33]"
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-[240px] overflow-y-auto p-1 custom-scrollbar">
            {VAT_OPTIONS.filter(opt => opt.toLowerCase().includes(taxSearch.toLowerCase())).map((option) => (
              <button
                key={option}
                onClick={() => setSelectedVat(option)}
                className={`w-full px-3 py-2.5 flex items-center justify-between rounded-lg transition-colors ${
                  selectedVat === option ? 'bg-[#FFFBEB] text-[#92400E]' : 'hover:bg-[#F9FAFB] text-[#374151]'
                }`}
              >
                <span className="text-[13px] font-medium text-left">{option}</span>
                {selectedVat === option && <Check size={16} weight="bold" />}
              </button>
            ))}
          </div>
          <div className="p-3 bg-[#F9FAFB] border-t border-[#F3F4F6] flex items-center justify-end gap-2">
            <button 
              onClick={() => setTaxRateDropdownId(null)}
              className="px-4 py-2 text-[13px] font-medium text-[#6B7280] hover:text-[#374151]"
            >
              Cancel
            </button>
            <button 
              onClick={handleApplyVat}
              className="px-5 py-2 bg-[#FFDD33] hover:bg-[#FACC15] text-black text-[13px] font-bold rounded-[8px] transition-colors shadow-sm"
            >
              Apply
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ExpensesTable;
