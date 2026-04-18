import React from 'react';
import { 
  X, 
  DownloadSimple, 
  PencilSimple, 
  SealCheck 
} from '@phosphor-icons/react';

interface AccountInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountInfoModal: React.FC<AccountInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const InfoRow = ({ label, value, isVerified }: { label: string; value: React.ReactNode; isVerified?: boolean }) => (
    <div className="flex justify-between items-center py-2">
      <span className="text-[14px] text-[#6B6B65] font-normal">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[14px] text-[#1A1A18] font-bold text-right">{value}</span>
        {isVerified && <SealCheck size={16} weight="fill" className="text-[#FFCC00]" />}
      </div>
    </div>
  );

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="mt-8 mb-2 first:mt-4">
      <h3 className="text-[11px] font-bold text-[#6B6B65] uppercase tracking-wider">{title}</h3>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E0]">
          <h2 className="text-[18px] font-bold text-[#1A1A18]">Account information</h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#6B6B65] hover:text-[#1A1A18] hover:bg-gray-100 rounded-lg transition-all"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-8">
          <SectionTitle title="Personal Information" />
          <div className="space-y-1">
            <InfoRow label="E-mail" value="sami+multireconcile@kletta.com" />
            <InfoRow label="First Name" value="Sam" />
            <InfoRow label="Last Name" value="Smith" />
            <InfoRow label="City" value="London" />
            <InfoRow label="Country" value={<span className="flex items-center gap-1.5"><span className="text-[16px]">🇬🇧</span> EN</span>} />
          </div>

          <SectionTitle title="Business Information" />
          <div className="space-y-1">
            <InfoRow label="Company Name" value="Sam's Barber" />
            <InfoRow label="UTR" value="1234567890" isVerified />
          </div>

          <SectionTitle title="Tax Information" />
          <div className="space-y-1">
            <InfoRow label="VAT return period" value="Not set" />
            <InfoRow label="Prepayment registered" value="—" />
            <InfoRow label="Last Tax Return Period" value="—" />
            <InfoRow label="Next Tax Return Period" value="—" />
          </div>

          <SectionTitle title="Subscription & Acount" />
          <div className="space-y-1">
            <InfoRow label="Plan" value="PARTNER" />
            <InfoRow label="Card added" value="—" />
            <InfoRow label="Created at" value="18.10.2025" />
            <InfoRow label="Last visit app" value="11.03.2026" />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 bg-white border-t border-[#E5E5E0] flex justify-end gap-3">
          <button 
            className="flex items-center gap-2 px-4 h-11 border border-[#B5B5B5] rounded-[10px] text-[14px] font-bold text-[#1A1A18] hover:bg-gray-50 transition-colors shadow-sm"
          >
            <DownloadSimple size={18} weight="bold" />
            Download diary
          </button>
          <button 
            className="flex items-center gap-2 px-6 h-11 bg-[#FFDD33] rounded-[10px] text-[14px] font-bold text-[#1A1A18] hover:shadow-md transition-all shadow-sm border border-[#1A1A18]"
            style={{ boxShadow: '0 4px 0 0 #1A1A18' }}
          >
            <PencilSimple size={18} weight="bold" />
            Edit profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoModal;
