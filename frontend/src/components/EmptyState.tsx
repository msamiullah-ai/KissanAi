import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionLink?: string;
}

const EmptyState = ({ title, message, actionLabel = 'Start recommendation', actionLink = '/recommendation' }: EmptyStateProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }} className="glass-card flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-dashed border-white/10 bg-slate-950/75 p-10 text-center text-slate-300">
      <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">No data yet</p>
      <h2 className="text-3xl font-semibold text-white">{title}</h2>
      <p className="max-w-xl text-sm leading-7 text-slate-400">{message}</p>
      <Link to={actionLink} className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50">
        {actionLabel}
      </Link>
    </motion.div>
  );
};

export default EmptyState;
