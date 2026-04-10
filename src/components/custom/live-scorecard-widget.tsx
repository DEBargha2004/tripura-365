import React from "react";

export function LiveScorecardWidget() {
  return (
    <div className="bg-[#0B152A] border border-[#1e293b] rounded-none p-4 mb-2 shadow-[0_4px_15px_rgba(0,0,0,0.5)] border-t-[3px] border-t-red-600 font-sans">
      <div className="flex justify-between items-center text-[10px] font-black text-slate-300 mb-3 uppercase tracking-widest border-b border-white/10 pb-2">
        <span>IPL 2026 • Match 42 • Wankhede</span>
        <span className="text-[#ED1C24] flex items-center gap-1.5 bg-red-600/10 px-2 py-0.5 rounded-sm">
          <span className="w-1.5 h-1.5 bg-[#ED1C24] rounded-full animate-pulse"></span>
          LIVE
        </span>
      </div>

      <div className="flex justify-between items-center text-white my-4 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-black text-slate-500 italic bg-[#0B152A] px-2 border border-[#1e293b] rounded-full z-10 w-6 h-6 flex items-center justify-center">
          V
        </div>

        <div className="flex items-center gap-3 w-[45%]">
          <div className="w-10 h-10 bg-blue-700/80 border border-blue-500 rounded-full flex items-center justify-center font-black text-sm shadow-inner shrink-0">
            MI
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tighter text-white">
              184<span className="text-lg text-slate-300 font-normal">/5</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              18.2 Overs
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 w-[45%] flex-row-reverse">
          <div className="w-10 h-10 bg-[#F5C518] border border-yellow-400 rounded-full flex items-center justify-center font-black text-sm text-black shadow-inner shrink-0">
            CSK
          </div>
          <div className="flex flex-col items-end">
            <span className="font-extrabold text-2xl tracking-tighter text-slate-200">
              --<span className="text-lg text-slate-500 font-normal">/--</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Yet to bat
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 text-[11px] font-bold text-white bg-[#002447] py-2 px-3 rounded-none text-center border border-blue-900/50 shadow-inner flex justify-center items-center gap-2">
        <span className="text-[#10B981]">CRR: 10.09</span>
        <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
        <span>MI opt to bat</span>
      </div>
    </div>
  );
}
