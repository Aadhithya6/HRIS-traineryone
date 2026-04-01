import { Clock, Activity } from 'lucide-react';
import { NotificationsBell } from './notifications-bell';

interface TopBarProps {
  currentTime: Date;
}

export function TopBar({ currentTime }: TopBarProps) {
  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-5 items-start animate-[fadeUp_0.5s_ease_both]">
      {/* Greeting Block */}
      <div className="flex flex-col gap-2">
        <span className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">
          Welcome back
        </span>
        <h1 className="text-5xl font-extrabold leading-tight bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] bg-clip-text text-transparent">
          Good Morning, Arjun!
        </h1>
        <p className="text-base text-muted-foreground mt-1">
          Here's what's happening in your workspace today.
        </p>
      </div>

      {/* Notifications Bell */}
      <div className="flex items-start pt-2">
        <NotificationsBell />
      </div>

      {/* Date & Time */}
      <div className="flex flex-col gap-2 p-5 px-6 bg-gradient-to-br from-[#2F80ED] to-[#56CCF2] rounded-2xl min-w-[200px] lg:text-right shadow-lg shadow-[#2F80ED]/20">
        <div className="text-4xl font-bold text-white tracking-tight">
          {formatTime(currentTime)}
        </div>
        <div className="text-sm text-white/90 font-medium">
          {formatDate(currentTime)}
        </div>
        <div className="flex items-center gap-2 mt-1 lg:justify-end">
          <Activity className="w-3.5 h-3.5 text-white animate-pulse" />
          <span className="text-sm text-white font-medium">Live</span>
        </div>
      </div>
    </div>
  );
}