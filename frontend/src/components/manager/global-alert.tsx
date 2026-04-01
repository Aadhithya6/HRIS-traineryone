import { Hand, ArrowRight } from 'lucide-react';

export function GlobalAlert() {
  // Get current time and date
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  
  // Important stats
  const issues = 3;
  const escalations = 2;
  const pending = 5;

  return (
    <div 
      className="rounded-[18px] p-6 mb-6 flex items-center justify-between"
      style={{
        background: 'linear-gradient(90deg, #3B82F6 0%, #06B6D4 100%)',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
      }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-[28px] font-[700] text-white">
            {greeting}, Manager
          </h1>
          <Hand size={28} className="text-white" strokeWidth={2} />
        </div>
        <p className="text-[15px] font-[400] text-white/90 mb-4">
          You have {pending} pending approvals, {issues} active issues, and {escalations} escalations requiring your immediate attention.
        </p>
        <button
          className="px-5 py-2.5 rounded-[10px] text-[14px] font-[600] transition-all hover:bg-white/30 flex items-center gap-2"
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          View Approvals
          <ArrowRight size={16} />
        </button>
      </div>
      
      <div className="flex gap-4 ml-8">
        <StatBox value={issues} label="Issues" />
        <StatBox value={escalations} label="Escalations" />
        <StatBox value={pending} label="Pending" />
      </div>
    </div>
  );
}

function StatBox({ value, label }: { value: number; label: string }) {
  return (
    <div 
      className="w-[100px] h-[100px] rounded-[16px] flex flex-col items-center justify-center"
      style={{
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <div className="text-[32px] font-[700] text-white mb-1">
        {value}
      </div>
      <div className="text-[13px] font-[500] text-white/90">
        {label}
      </div>
    </div>
  );
}