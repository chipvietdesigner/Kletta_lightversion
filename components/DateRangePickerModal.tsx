import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaretLeft, CaretRight, CaretDown, X } from '@phosphor-icons/react';

interface DateRangePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (range: string) => void;
}

const DateRangePickerModal: React.FC<DateRangePickerModalProps> = ({ isOpen, onClose, onApply }) => {
  const [selectedPreset, setSelectedPreset] = useState('Last tax year');
  
  const presets = [
    'Last 7 days',
    'Last 4 weeks',
    'Last year',
    'Month to date',
    'Quarter to date',
    'Year to date',
    'All time',
    'This tax year',
    'Last tax year',
    'Q1 this year',
    'Q2 this year',
    'Q3 this year',
    'Q4 this year',
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-2xl w-[480px] overflow-hidden flex flex-col"
        >
          {/* Main Content */}
          <div className="flex h-[480px]">
            {/* Left: Calendar */}
            <div className="flex-1 p-6 border-r border-[#E5E7EB]">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-8">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]">
                  <CaretLeft size={16} />
                </button>
                
                <div className="flex gap-2">
                  <div className="h-9 px-3 flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-lg cursor-pointer">
                    <span className="text-[13px] font-medium text-[#0F2F33]">Apr</span>
                    <CaretDown size={14} className="text-[#9CA3AF]" />
                  </div>
                  <div className="h-9 px-3 flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-lg cursor-pointer">
                    <span className="text-[13px] font-medium text-[#0F2F33]">2025</span>
                    <CaretDown size={14} className="text-[#9CA3AF]" />
                  </div>
                </div>

                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]">
                  <CaretRight size={16} />
                </button>
              </div>

              {/* Calendar Weekdays */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-center text-[13px] font-medium text-[#6B7280] py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {[30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3].map((day, idx) => {
                  const isCurrentMonth = (idx >= 2 && idx <= 31);
                  const isToday = day === 6 && idx === 7;
                  
                  return (
                    <div 
                      key={idx} 
                      className={`h-9 flex items-center justify-center text-[13px] cursor-pointer rounded-lg transition-all ${
                        isToday 
                          ? 'bg-[#005A66] text-white font-bold' 
                          : isCurrentMonth 
                            ? 'text-[#0F2F33] hover:bg-[#F3F4F6]' 
                            : 'text-[#9CA3AF]'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Presets */}
            <div className="w-[180px] p-2 overflow-y-auto custom-scrollbar bg-white">
              <div className="space-y-0.5">
                {presets.map(preset => (
                  <button
                    key={preset}
                    onClick={() => setSelectedPreset(preset)}
                    className={`w-full text-left px-4 py-2.5 text-[13px] font-medium rounded-lg transition-colors ${
                      selectedPreset === preset 
                        ? 'bg-[#F3F4F6] text-[#0F2F33]' 
                        : 'text-[#0F2F33] hover:bg-gray-50'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-white border-t border-[#E5E7EB]">
            <button 
              onClick={() => {
                onApply?.(selectedPreset);
                onClose();
              }}
              className="w-full h-[36px] bg-[#005A66] text-white font-bold rounded-lg hover:bg-[#004852] transition-colors"
            >
              Apply
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DateRangePickerModal;
