import { CloudRain, Flame, ShieldCheck, Sparkles } from 'lucide-react';

export const landingStats = [
  { label: 'AI predictions', value: '94%' },
  { label: 'Crop models', value: '5+' },
  { label: 'Risk signals', value: '24/7' },
  { label: 'Tailored plans', value: '300+' },
];

export const landingFeatures = [
  {
    title: 'Weather-aware insights',
    description: 'Real-time weather intelligence influences crop selection and irrigation planning.',
    icon: <CloudRain className="h-5 w-5" />,
  },
  {
    title: 'Profitability radar',
    description: 'Understand expected profit per acre and focus on high-margin crops.',
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: 'Risk management',
    description: 'Stable risk indicators help plan safe farm decisions across seasons.',
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: 'Irrigation alerts',
    description: 'Get adaptive watering advice to protect crops during low rainfall periods.',
    icon: <Flame className="h-5 w-5" />,
  },
];
