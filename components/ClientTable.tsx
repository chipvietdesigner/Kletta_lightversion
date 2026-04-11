import React, { useState } from 'react';
import { Client } from '../types';

interface ClientTableProps {
  clients: Client[];
}

const ClientTable: React.FC<ClientTableProps> = ({ clients }) => {
  const [hoveredRowId, setHoveredRowId] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col flex-1 overflow-hidden mt-2 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0 flex flex-col">
        <table className="text-left border-collapse table-fixed w-full">
          <thead className="bg-[#F9FAFB] text-[#000000] sticky top-0 z-10 h-[48px]">
            <tr>
              <th className="px-4 font-medium text-[13px] w-[60px] text-center border-b border-[#E5E7EB]">#</th>
              <th className="px-4 font-medium text-[13px] w-[240px] border-b border-[#E5E7EB]">E-mail</th>
              <th className="px-4 font-medium text-[13px] w-[180px] border-b border-[#E5E7EB]">Country</th>
              <th className="px-4 font-medium text-[13px] w-[140px] border-b border-[#E5E7EB]">Plan</th>
              <th className="px-4 font-medium text-[13px] w-[140px] border-b border-[#E5E7EB]">UTR</th>
              <th className="px-4 font-medium text-[13px] w-[140px] text-center border-b border-[#E5E7EB]">Prepayment</th>
              <th className="px-4 font-medium text-[13px] w-[180px] border-b border-[#E5E7EB]">Company Name</th>
              <th className="px-4 font-medium text-[13px] w-[140px] border-b border-[#E5E7EB]">First Name</th>
              <th className="px-4 font-medium text-[13px] w-[140px] border-b border-[#E5E7EB]">Last Name</th>
              <th className="px-4 font-medium text-[13px] w-[150px] border-b border-[#E5E7EB]">Phone</th>
              <th className="px-4 font-medium text-[13px] w-[180px] border-b border-[#E5E7EB]">Sales Person</th>
              <th className="px-4 font-medium text-[13px] w-[280px] border-b border-[#E5E7EB]">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {clients.map((c, index) => {
              const isRowHovered = hoveredRowId === c.id;
              const bgClass = isRowHovered ? 'bg-[#FAFAF8]' : 'bg-white';
              
              return (
                <tr key={c.id} className={`group transition-colors h-[64px] border-b border-[#E5E7EB] last:border-0 ${bgClass}`} onMouseEnter={() => setHoveredRowId(c.id)} onMouseLeave={() => setHoveredRowId(null)}>
                  <td className="p-0"><div className="h-full flex items-center justify-center px-4 text-[#000000] font-normal text-[13px]">{index + 1}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] font-medium truncate text-[13px]">{c.email}</div></td>
                  <td className="p-0">
                    <div className="h-full flex items-center gap-2 px-4 text-[13px]">
                      <span className="text-[18px]">{c.countryCode === 'FI' ? '🇫🇮' : '🇬🇧'}</span>
                      <span className="text-[#000000] font-normal">{c.countryCode === 'FI' ? 'Finland' : 'United Kingdom'}</span>
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="h-full flex items-center px-4">
                      <span className="px-3 py-1 rounded-lg text-[12px] font-medium border bg-[#DBEAFE] text-[#1E40AF] border-[#DBEAFE]">
                        {c.plan}
                      </span>
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="h-full flex items-center px-4 text-[#000000] text-[13px] font-normal">
                      <div className="flex items-center gap-2">
                        <span>{c.utr}</span>
                        {c.isUtrVerified ? (
                          <span className="material-symbols-outlined text-[#166534]" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1, 'wght' 400" }}>verified</span>
                        ) : (
                          <span className="material-symbols-outlined text-[#E5E7EB]" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 0, 'wght' 400" }}>verified</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="h-full flex items-center justify-center px-4">
                      {c.isPrepaymentRegistered ? (
                        <div className="w-5 h-5 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#166534]">
                          <span className="text-[12px] font-bold">✓</span>
                        </div>
                      ) : (
                        <span className="text-[#E5E7EB]">—</span>
                      )}
                    </div>
                  </td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] font-normal truncate text-[13px]">{c.companyName}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] truncate text-[13px] font-normal">{c.firstName}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] truncate text-[13px] font-normal">{c.lastName}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] text-[13px] font-normal">{c.phone}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] text-[13px] font-medium">{c.salesPerson}</div></td>
                  <td className="p-0"><div className="h-full flex items-center gap-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity"><button className="h-[36px] bg-[#FFDD33] text-[#0F3A3E] font-medium px-4 rounded-[8px] text-[12px] flex items-center gap-2"><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>login</span>Login</button><button className="h-[36px] bg-white border border-[#B5B5B5] text-[#000000] font-medium px-3 rounded-[8px] text-[12px] flex items-center justify-center"><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span></button></div></td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {clients.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-[#F9F9F8] rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[#9CA3AF]" style={{ fontSize: '32px' }}>search_off</span>
            </div>
            <h3 className="text-[16px] font-medium text-[#000000] mb-1">No clients found</h3>
            <p className="text-[13px] text-[#616A6B]">There are no records to display for this period.</p>
          </div>
        )}
      </div>
      <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#000000] px-6 border-t border-[#E5E7EB]">
         <div><span className="font-medium text-[#000000]">{clients.length}</span> clients found</div>
      </div>
    </div>
  );
};

export default ClientTable;