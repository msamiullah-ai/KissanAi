import { AnimatePresence, motion } from 'framer-motion';
import { Command, Download, RefreshCw, Sparkles } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: () => void;
  onRefresh: () => void;
  onGenerate: () => void;
}

const CommandPalette = ({ isOpen, onClose, onExport, onRefresh, onGenerate }: CommandPaletteProps) => {
  const commands = [
    { label: 'Generate recommendation', icon: Sparkles, action: onGenerate },
    { label: 'Refresh weather feed', icon: RefreshCw, action: onRefresh },
    { label: 'Export report', icon: Download, action: onExport },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/70 px-4 pt-28 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3">
              <Command className="h-4 w-4 text-emerald-300" />
              <span className="text-sm text-slate-300">Command palette</span>
            </div>
            <div className="mt-3 space-y-2">
              {commands.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      item.action();
                      onClose();
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-emerald-400/10 hover:text-emerald-100"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
