import { MoodType } from '@/types';

interface MoodBadgeProps {
  mood: MoodType;
  onClick?: () => void;
  selected?: boolean;
}

const moodConfig: Record<MoodType, { label: string; emoji: string; color: string }> = {
  LAUGH: { label: 'Laugh', emoji: '😂', color: 'bg-yellow-500/20 text-yellow-400' },
  CRY: { label: 'Cry', emoji: '😢', color: 'bg-blue-500/20 text-blue-400' },
  ROMANTIC: { label: 'Romantic', emoji: '💕', color: 'bg-pink-500/20 text-pink-400' },
  ACTION: { label: 'Action', emoji: '💥', color: 'bg-orange-500/20 text-orange-400' },
  SCIFI: { label: 'Sci-Fi', emoji: '🚀', color: 'bg-purple-500/20 text-purple-400' },
  MIND_BLOWING: { label: 'Mind-blowing', emoji: '🤯', color: 'bg-indigo-500/20 text-indigo-400' },
  DARK_MYSTERIOUS: { label: 'Dark', emoji: '🌑', color: 'bg-gray-500/20 text-gray-400' },
  FEEL_GOOD: { label: 'Feel-good', emoji: '😊', color: 'bg-green-500/20 text-green-400' },
  EMOTIONAL: { label: 'Emotional', emoji: '❤️', color: 'bg-red-500/20 text-red-400' },
  SLOW_BURN: { label: 'Slow-burn', emoji: '🔥', color: 'bg-amber-500/20 text-amber-400' },
  THRILLER: { label: 'Thriller', emoji: '😱', color: 'bg-red-600/20 text-red-300' },
};

export default function MoodBadge({ mood, onClick, selected = false }: MoodBadgeProps) {
  const config = moodConfig[mood];

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
        transition-all duration-200
        ${config.color}
        ${onClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
        ${selected ? 'ring-2 ring-primary' : ''}
      `}
    >
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </button>
  );
}
