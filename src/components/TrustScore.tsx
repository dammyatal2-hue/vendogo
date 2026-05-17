import { getVendorLevel, VendorLevel, LEVEL_COLORS } from '../lib/types';

interface TrustScoreProps {
  score: number;
  compact?: boolean;
}

const LEVEL_THRESHOLDS: { level: VendorLevel; min: number }[] = [
  { level: 'Top Vendor',      min: 80 },
  { level: 'Trusted Vendor',  min: 55 },
  { level: 'Verified Seller', min: 30 },
  { level: 'New Seller',      min: 0  },
];

export const TrustScore = ({ score, compact = false }: TrustScoreProps) => {
  const level = getVendorLevel(score);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary rounded-full transition-all duration-700"
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-xs font-bold text-primary whitespace-nowrap">{score}/100</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Trust Score</span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${LEVEL_COLORS[level]}`}>{level}</span>
      </div>
      <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
        <div
          className="h-full bg-secondary rounded-full transition-all duration-700"
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-on-surface-variant font-bold">
        <span>0</span>
        <span className="text-primary font-extrabold">{score}</span>
        <span>100</span>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-1">
        {LEVEL_THRESHOLDS.slice().reverse().map(({ level: l, min }) => (
          <div key={l} className={`flex items-center gap-1.5 text-[10px] font-bold ${score >= min ? 'text-primary' : 'text-on-surface-variant opacity-40'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${score >= min ? 'bg-secondary' : 'bg-outline-variant'}`} />
            {l}
          </div>
        ))}
      </div>
    </div>
  );
};
