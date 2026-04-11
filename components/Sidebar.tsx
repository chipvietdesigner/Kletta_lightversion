import React, { useState } from 'react';
import { NavItemType } from '../types';

interface SidebarProps {
  activeItem: NavItemType;
  setActiveItem: (item: NavItemType) => void;
  onLogout: () => void;
}

const NavIcon: React.FC<{ name: string; isActive?: boolean; className?: string }> = ({ name, isActive, className }) => (
  <span 
    className={`material-symbols-outlined ${className}`} 
    style={{ 
      fontSize: '20px', 
      fontVariationSettings: isActive ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400" 
    }}
  >
    {name}
  </span>
);

const NavItem: React.FC<{ 
  item: { type: NavItemType; iconName: string }; 
  activeItem: NavItemType; 
  setActiveItem: (item: NavItemType) => void;
}> = ({ item, activeItem, setActiveItem }) => {
  const isActive = activeItem === item.type;
  
  return (
    <button
      onClick={() => setActiveItem(item.type)}
      className={`w-full h-[36px] flex items-center gap-3 px-3 transition-all duration-200 rounded-[10px] group ${
        isActive 
          ? 'bg-[#005A66] text-white' 
          : 'text-[#1A1A18] hover:bg-[#E2E1DC]'
      }`}
    >
      <NavIcon 
        name={item.iconName} 
        isActive={isActive}
        className={isActive ? "text-white" : "text-[#1A1A18]"} 
      />
      <span className={`font-sans text-[14px] tracking-tight truncate ${isActive ? 'font-bold' : 'font-medium'}`}>
        {item.type}
      </span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem, onLogout }) => {
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const [isClientLoginOpen, setIsClientLoginOpen] = useState(false);

  const topNavItems = [
    { type: NavItemType.WELCOME, iconName: 'waving_hand' },
    { type: NavItemType.CHAT, iconName: 'chat' },
    { type: NavItemType.ALL_CLIENTS, iconName: 'group' },
    { type: NavItemType.INVITATIONS, iconName: 'person_add' },
    { type: NavItemType.ACCOUNT, iconName: 'settings' },
    { type: NavItemType.TAX_RETURN, iconName: 'description' },
    { type: NavItemType.VAT_RETURNS, iconName: 'description' },
  ];

  const mainNavItems = [
    { type: NavItemType.DASHBOARD, iconName: 'home' },
    { type: NavItemType.TRANSACTIONS, iconName: 'payments' },
    { type: NavItemType.INCOME, iconName: 'attach_money' },
    { type: NavItemType.EXPENSES, iconName: 'account_balance_wallet' },
    { type: NavItemType.MILEAGES, iconName: 'directions_car' },
    { type: NavItemType.ASSET, iconName: 'desktop_windows' },
    { type: NavItemType.INVOICES, iconName: 'description' },
    { type: NavItemType.REPORTS, iconName: 'trending_up' },
  ];

  return (
    <>
    <div className="w-[240px] min-w-[240px] bg-[#EFF4F5] text-[#1A1A18] flex flex-col h-full flex-shrink-0 font-sans border-r border-[#DDDDD6] relative z-20">
      {/* Logo Section */}
      <div className="pt-5 px-6 pb-4">
        <img src="https://i.ibb.co/99RKpWNq/Color-Black.png" alt="Kletta Logo" className="w-24 h-auto" />
        <div className="mt-1 text-[12px] font-normal text-[#6B6B65]">Marcha Company LLC</div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3">
        {/* Top Nav Section */}
        <div className="mt-2 space-y-0.5">
          {topNavItems.map((item) => (
            <NavItem key={item.type} item={item} activeItem={activeItem} setActiveItem={setActiveItem} />
          ))}
        </div>

        {/* AI Support Toggle */}
        <div className="mt-1 mb-3">
          <div 
            onClick={() => setActiveItem(NavItemType.AI_SUPPORT)} 
            className={`h-[36px] flex items-center justify-between px-3 cursor-pointer transition-all duration-200 rounded-[10px] ${activeItem === NavItemType.AI_SUPPORT ? 'bg-[#005A66] text-white' : 'hover:bg-[#E2E1DC]'}`}
          >
            <div className="flex items-center gap-3">
              <NavIcon 
                name="auto_awesome" 
                isActive={activeItem === NavItemType.AI_SUPPORT}
                className={activeItem === NavItemType.AI_SUPPORT ? "text-white" : "text-[#005A66]"} 
              />
              <div className="flex flex-col">
                <span className={`text-[14px] leading-tight ${activeItem === NavItemType.AI_SUPPORT ? 'font-bold text-white' : 'font-medium text-[#1A1A18]'}`}>AI Support</span>
                <span className={`text-[11px] leading-tight ${activeItem === NavItemType.AI_SUPPORT ? 'text-white/80' : 'text-[#6B6B65]'}`}>Intelligence</span>
              </div>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsAIEnabled(!isAIEnabled); }} 
              className={`w-[36px] h-[20px] rounded-full relative transition-colors duration-300 focus:outline-none ${isAIEnabled ? 'bg-[#1D6B5A]' : 'bg-[#C5C5BE]'}`}
            >
              <div className={`absolute top-[2px] w-[16px] h-[16px] bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isAIEnabled ? 'left-[18px]' : 'left-[2px]'}`}></div>
            </button>
          </div>
        </div>

        <div className="h-[1px] bg-[#DDDDD6] my-3 mx-3"></div>

        {/* User Account Section */}
        <div className="px-3 py-3 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#005A66] flex items-center justify-center text-white font-bold text-[12px] flex-shrink-0">
              MV
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-bold text-[#1A1A18] truncate">Matti V.</div>
              <div className="text-[12px] text-[#6B6B65] truncate">Esimerkki Oy</div>
            </div>
            <NavIcon name="expand_more" className="text-[#6B6B65] flex-shrink-0" />
          </div>
        </div>

        {/* Main Nav Section */}
        <div className="space-y-0.5 pb-6">
          {mainNavItems.map((item) => (
            <NavItem key={item.type} item={item} activeItem={activeItem} setActiveItem={setActiveItem} />
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex-shrink-0 px-6 py-6 border-t border-[#DDDDD6]">
        <div className="space-y-5">
          <button 
            onClick={() => setIsClientLoginOpen(true)} 
            className="flex items-center gap-3 text-[#1A1A18] text-[14px] font-medium hover:opacity-80 transition-opacity"
          >
            <NavIcon name="description" />
            Login to Client App
          </button>
          
          <button 
            onClick={onLogout} 
            className="flex items-center gap-3 text-[#E05A2B] text-[14px] font-medium hover:opacity-80 transition-opacity"
          >
            <NavIcon name="logout" />
            Logout
          </button>
        </div>
      </div>
    </div>

    {/* Login Modal */}
    {isClientLoginOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm transition-all duration-300" onClick={() => setIsClientLoginOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[440px] relative animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300 overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
             <button onClick={() => setIsClientLoginOpen(false)} className="absolute top-4 right-4 p-2 text-[#6B6B65] hover:text-[#1A1A18] hover:bg-gray-100 rounded-full transition-all z-10">
               <NavIcon name="close" className="font-bold" />
             </button>
             <div className="px-8 pt-10 pb-6 text-center">
               <div className="w-16 h-16 bg-[#F9FAFB] border border-[#DDDDD6] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm transform rotate-3">
                 <NavIcon name="smartphone" className="text-[#1D6B5A]" style={{ fontSize: '32px' }} />
               </div>
               <h2 className="text-[22px] font-medium text-[#1A1A18] mb-2 tracking-tight">Login to Client App</h2>
               <p className="text-[14px] text-[#6B6B65] leading-relaxed max-w-[280px] mx-auto">Enter these credentials on the client's device to access the Kletta dashboard.</p>
             </div>
             <div className="px-8 pb-8 space-y-8">
                <div className="bg-[#F9FAFB] border border-[#DDDDD6] rounded-xl p-6 shadow-sm space-y-5">
                    <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider font-medium text-[#6B6B65] ml-1">Client E-mail</label><div className="group flex items-center justify-between bg-white border border-[#B5B5B5] hover:border-gray-300 transition-colors rounded-[8px] px-3 py-2.5 shadow-sm"><span className="text-[14px] font-medium text-[#1A1A18] truncate mr-3 select-all">sami+client@kletta.com</span><button className="text-[#6B6B65] hover:text-[#1A1A18] p-1.5 rounded-md transition-colors" title="Copy email"><NavIcon name="content_copy" style={{ fontSize: '16px' }} /></button></div></div>
                    <div className="space-y-1.5"><label className="text-[10px] uppercase tracking-wider font-medium text-[#6B6B65] ml-1">PIN Code</label><div className="flex gap-3">{[5, 2, 9, 1].map((digit, i) => (<div key={i} className="flex-1 h-14 bg-white border border-[#B5B5B5] rounded-[8px] flex items-center justify-center text-2xl font-medium text-[#1A1A18] shadow-sm tracking-tight">{digit}</div>))}</div></div>
                </div>
                <div>
                    <h3 className="text-[11px] font-medium text-[#1A1A18] mb-3 uppercase tracking-wide">Instructions</h3>
                    <div className="space-y-3">{['Open Kletta app on device', 'Tap "Login with accountant"', 'Enter credentials shown above'].map((step, idx) => (<div key={idx} className="flex gap-3 items-center"><div className="w-5 h-5 rounded-full bg-[#1D6B5A] text-white flex items-center justify-center text-[10px] font-medium flex-shrink-0 shadow-sm">{idx + 1}</div><span className="text-[13px] text-[#6B6B65] font-medium" dangerouslySetInnerHTML={{ __html: step.replace('"Login with accountant"', '<span class="text-[#1A1A18] font-medium">"Login with accountant"</span>') }} /></div>))}</div>
                </div>
             </div>
             <div className="py-4 bg-[#F9FAFB] border-t border-[#DDDDD6] flex items-center justify-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div><p className="text-[12px] text-[#6B6B65] font-medium">Code expires <span className="text-[#1A1A18] font-medium">Today, 14:00</span></p></div>
          </div>
        </div>
    )}
    </>
  );
};

export default Sidebar;
