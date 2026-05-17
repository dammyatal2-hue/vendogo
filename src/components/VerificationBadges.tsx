import { BadgeType, VendorLevel, LEVEL_COLORS } from '../lib/types';
import { ShieldCheck, GraduationCap, Star, Zap, ThumbsUp } from 'lucide-react';

const BADGE_CONFIG: Record<BadgeType, { label: string; icon: any; style: string }> = {
  verified_seller: { label: 'Verified Seller', icon: ShieldCheck, style: 'bg-primary/10 text-primary border-primary/20' },
  student_vendor:  { label: 'Student Vendor',  icon: GraduationCap, style: 'bg-secondary/20 text-primary border-secondary/30' },
  trusted_vendor:  { label: 'Trusted Vendor',  icon: Star,          style: 'bg-secondary text-primary border-secondary' },
  fast_delivery:   { label: 'Fast Delivery',   icon: Zap,           style: 'bg-green-50 text-green-700 border-green-200' },
  top_rated:       { label: 'Top Rated',        icon: ThumbsUp,      style: 'bg-amber-50 text-amber-700 border-amber-200' },
};

export const VerificationBadges = ({ badges }: { badges: BadgeType[] }) => {
  if (!badges.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map(badge => {
        const { label, icon: Icon, style } = BADGE_CONFIG[badge];
        return (
          <span key={badge} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${style}`}>
            <Icon className="w-3 h-3" />
            {label}
          </span>
        );
      })}
    </div>
  );
};

export const VendorLevelBadge = ({ level }: { level: VendorLevel }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${LEVEL_COLORS[level]}`}>
    {level}
  </span>
);
