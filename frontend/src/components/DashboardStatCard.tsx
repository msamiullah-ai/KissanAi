import type { LucideIcon } from 'lucide-react';

interface DashboardStatCardProps {
  title: string;
  value: string;
  Icon: LucideIcon;
  accent: string;
}

const DashboardStatCard = ({ title, value, Icon, accent }: DashboardStatCardProps) => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br ${accent}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
};

export default DashboardStatCard;
