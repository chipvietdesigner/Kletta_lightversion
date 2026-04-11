import React from 'react';
import { MagnifyingGlass, Funnel, Plus, CalendarBlank } from '@phosphor-icons/react';

interface TableToolbarProps {
  onSearch?: (value: string) => void;
  onFilterClick?: () => void;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: React.ReactNode;
  placeholder?: string;
  leftActions?: React.ReactNode;
}

const TableToolbar: React.FC<TableToolbarProps> = ({ 
  onSearch, 
  onFilterClick, 
  actionButton, 
  secondaryAction,
  placeholder = "Search...",
  leftActions
}) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        {leftActions}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#9CA3AF]">
            <MagnifyingGlass size={16} />
          </div>
          <input 
            type="text" 
            placeholder={placeholder}
            onChange={(e) => onSearch?.(e.target.value)}
            className="h-[42px] pl-10 pr-4 bg-white border border-[#B5B5B5] rounded-[8px] text-[14px] text-[#0F2F33] placeholder-[#9CA3AF] focus:border-[#005A66] focus:border-2 focus:shadow-[0_0_0_3px_rgba(0,90,102,0.20)] transition-all w-[260px] focus:outline-none font-normal"
          />
        </div>
        <button 
          onClick={onFilterClick}
          className="h-[42px] px-4 bg-white border border-[#B5B5B5] rounded-[8px] text-[14px] text-[#0F2F33] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]"
        >
          <Funnel size={16} className="text-[#9CA3AF]" />
          Filters
        </button>
      </div>
      <div className="flex items-center gap-3">
        {actionButton && (
          <button 
            onClick={actionButton.onClick}
            className="h-[42px] px-5 bg-[#FFDD33] hover:bg-[#FACC15] text-[#000000] text-[14px] font-medium rounded-[8px] flex items-center gap-2 transition-colors shadow-sm"
          >
            {actionButton.icon || <Plus size={16} weight="bold" />}
            {actionButton.label}
          </button>
        )}
        {secondaryAction || (
          <div className="flex items-center gap-2 h-[42px] px-4 bg-white border border-[#B5B5B5] rounded-[8px] transition-colors cursor-pointer hover:border-[#D1D5DB]">
            <CalendarBlank size={16} className="text-[#9CA3AF]" />
            <span className="text-[13px] text-[#0F2F33] font-medium">This tax year (01.01 → 31.12.2025)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableToolbar;
