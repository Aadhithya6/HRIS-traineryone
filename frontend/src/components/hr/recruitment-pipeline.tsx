const positions = [
  { role: 'Senior Frontend Developer', dept: 'Engineering',    progress: 70, count: 14, status: 'Urgent',  statusColor: 'var(--hris-danger)',  statusBg: 'rgba(239,68,68,0.1)'   },
  { role: 'Product Manager',           dept: 'Product',        progress: 45, count: 8,  status: 'Active',  statusColor: 'var(--hris-success)', statusBg: 'rgba(16,185,129,0.1)'  },
  { role: 'UX Designer',               dept: 'Design',         progress: 85, count: 21, status: 'Active',  statusColor: 'var(--hris-success)', statusBg: 'rgba(16,185,129,0.1)'  },
  { role: 'Data Analyst',              dept: 'Analytics',      progress: 20, count: 4,  status: 'On Hold', statusColor: 'var(--hris-warn)',    statusBg: 'rgba(245,158,11,0.1)'  },
  { role: 'DevOps Engineer',           dept: 'Infrastructure', progress: 55, count: 11, status: 'Active',  statusColor: 'var(--hris-success)', statusBg: 'rgba(16,185,129,0.1)'  },
];

const stages = [
  { value: '58', label: 'Applied',   color: 'var(--hris-muted)'       },
  { value: '23', label: 'Screening', color: 'var(--hris-primary)'     },
  { value: '12', label: 'Interview', color: 'var(--hris-warn)'        },
  { value: '5',  label: 'Offer',     color: 'var(--hris-purple-icon)' },
  { value: '3',  label: 'Hired',     color: 'var(--hris-success)'     },
];

export function RecruitmentPipeline() {
  return (
    <div
      className="rounded-[18px] p-5 border-[1.5px]"
      style={{ background: '#FFFFFF', borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--hris-text)', letterSpacing: '-0.1px' }}>
          Recruitment Pipeline
        </span>
        <a
          href="#"
          className="px-2.5 py-1 rounded-lg border-[1.5px] transition-all"
          style={{ fontSize: '12px', fontWeight: 600, color: 'var(--hris-primary)', borderColor: 'rgba(47,128,237,0.25)', background: 'rgba(47,128,237,0.04)', textDecoration: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(47,128,237,0.1)'; e.currentTarget.style.borderColor = 'var(--hris-primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(47,128,237,0.04)'; e.currentTarget.style.borderColor = 'rgba(47,128,237,0.25)'; }}
        >
          View All →
        </a>
      </div>

      <div>
        {positions.map((position, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 py-3 border-b last:border-b-0"
            style={{ borderColor: 'var(--hris-border)' }}
          >
            <div className="flex-1 min-w-0">
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--hris-text)' }}>{position.role}</div>
              <div style={{ fontSize: '11px', color: 'var(--hris-muted)', marginTop: '2px' }}>{position.dept}</div>
            </div>
            <div className="w-20">
              <div className="h-[5px] rounded overflow-hidden border" style={{ background: '#F3F4F6', borderColor: 'var(--hris-border)' }}>
                <div
                  className="h-full rounded"
                  style={{
                    width: `${position.progress}%`,
                    background: position.progress > 70 ? 'var(--hris-success)' : position.progress > 40 ? 'var(--hris-primary)' : 'var(--hris-warn)',
                  }}
                />
              </div>
            </div>
            <div className="min-w-[24px] text-right" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--hris-primary)' }}>
              {position.count}
            </div>
            <span
              className="px-2 py-0.5 rounded-md whitespace-nowrap"
              style={{ background: position.statusBg, color: position.statusColor, fontSize: '11px', fontWeight: 600 }}
            >
              {position.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--hris-border)' }}>
        <div className="mb-3" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', color: 'var(--hris-muted)', textTransform: 'uppercase' }}>
          Stage Overview
        </div>
        <div className="flex gap-2">
          {stages.map((stage, idx) => (
            <div
              key={idx}
              className="flex-1 min-w-[50px] rounded-xl px-2 py-3 text-center border-[1.5px]"
              style={{ background: '#FFFFFF', borderColor: 'var(--hris-border)' }}
            >
              <div style={{ fontSize: '20px', fontWeight: 800, lineHeight: 1, color: stage.color }}>{stage.value}</div>
              <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--hris-muted)', marginTop: '4px' }}>{stage.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
