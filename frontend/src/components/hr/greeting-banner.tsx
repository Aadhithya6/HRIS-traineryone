import { useNavigate } from 'react-router';
import { getUser } from '../../api/client';

export function GreetingBanner() {
  const user = getUser();
  const navigate = useNavigate();
  const firstName = user?.name?.split(' ')[0] || 'HR';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div
      className="rounded-[18px] p-7 flex items-center justify-between relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--hris-gradient-from) 0%, #4A94F0 50%, var(--hris-gradient-to) 100%)',
        boxShadow: '0 4px 20px rgba(47,128,237,0.25)',
      }}
    >
      <div
        className="absolute rounded-full"
        style={{ top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.08)' }}
      />
      <div
        className="absolute rounded-full"
        style={{ bottom: '-60px', right: '120px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.06)' }}
      />

      <div className="relative z-10">
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>
          {greeting}, {firstName} 👋
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', marginTop: '6px', fontWeight: 500 }}>
          You have pending approvals and alerts requiring your attention today.
        </p>
        <button
          onClick={() => navigate('/hr/approvals')}
          className="mt-4 px-5 py-2.5 rounded-[10px] transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 600,
            border: '1.5px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
          }}
        >
          View Approvals →
        </button>
      </div>

      <div className="flex gap-5 relative z-10">
        {[
          { value: '7',   label: 'Pending'   },
          { value: '3',   label: 'Alerts'    },
          { value: '512', label: 'Employees' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="rounded-xl px-5 py-3 text-center border"
            style={{
              background: 'rgba(255,255,255,0.2)',
              borderColor: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#FCD34D', lineHeight: 1, textShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)', marginTop: '4px', fontWeight: 600 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
