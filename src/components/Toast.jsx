import React from 'react';
import { useData } from '../context/DataContext';
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';

export default function Toast() {
  const { toast } = useData();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-ocean-500" />
  };

  const borders = {
    success: 'border-emerald-500/30 bg-emerald-50/90 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-100',
    warning: 'border-amber-500/30 bg-amber-50/90 dark:bg-amber-950/80 text-amber-900 dark:text-amber-100',
    error: 'border-red-500/30 bg-red-50/90 dark:bg-red-950/80 text-red-900 dark:text-red-100',
    info: 'border-ocean-500/30 bg-ocean-50/90 dark:bg-ocean-950/80 text-ocean-900 dark:text-ocean-100'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl backdrop-blur-md border ${borders[toast.type] || borders.info} max-w-md`}>
        {icons[toast.type] || icons.info}
        <p className="text-xs font-semibold leading-relaxed">
          {toast.message}
        </p>
      </div>
    </div>
  );
}
