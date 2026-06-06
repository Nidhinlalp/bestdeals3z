'use client';

import { motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ tabs, className }: { tabs: Tab[]; className?: string }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div className={className}>
      <div className="border-hairline no-scrollbar flex gap-6 overflow-x-auto border-b">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={cn(
              'text-nav-link relative shrink-0 pb-3 transition-colors',
              active === t.id ? 'text-ink' : 'text-muted hover:text-ink'
            )}
          >
            {t.label}
            {active === t.id && (
              <motion.span
                layoutId="tab-underline"
                className="bg-ink absolute -bottom-px left-0 right-0 h-0.5 rounded-full"
              />
            )}
          </button>
        ))}
      </div>
      <motion.div
        key={activeTab?.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="pt-6"
      >
        {activeTab?.content}
      </motion.div>
    </div>
  );
}
