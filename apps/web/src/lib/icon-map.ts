// Explicit icon map for data-driven icon names (keeps tree-shaking working —
// avoids `import * as Icons from 'lucide-react'`).
import {
  BadgeCheck,
  Check,
  Heart,
  Leaf,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Truck,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  BadgeCheck,
  Check,
  Heart,
  Leaf,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Truck,
  Zap,
};

export const getIcon = (name: string): LucideIcon => iconMap[name] ?? Check;
