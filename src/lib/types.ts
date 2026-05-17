export type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type VendorLevel = 'New Seller' | 'Verified Seller' | 'Trusted Vendor' | 'Top Vendor';
export type BadgeType = 'verified_seller' | 'student_vendor' | 'trusted_vendor' | 'fast_delivery' | 'top_rated';

export interface SocialLinks {
  instagram?: string;
  tiktok?: string;
  whatsapp?: string;
}

export interface VendorProfile {
  id: string;
  business_name: string;
  category: string;
  description: string;
  phone: string;
  phone_verified: boolean;
  bank_name: string;
  account_number: string;
  account_name: string;
  social_links: SocialLinks;
  social_verified: boolean;
  is_student_vendor: boolean;
  school_name?: string;
  school_id_url?: string;
  student_verified: boolean;
  selfie_url?: string;
  logo_url?: string;
  trust_score: number;
  vendor_level: VendorLevel;
  verification_status: VerificationStatus;
  verification_badges: BadgeType[];
  completed_orders: number;
  positive_reviews: number;
  response_time_minutes: number;
  joined_date: string;
  verification_documents: string[];
}

export const NIGERIAN_BANKS = [
  'Opay', 'PalmPay', 'Moniepoint',
  'GTBank', 'UBA', 'Access Bank', 'First Bank',
  'Zenith Bank', 'Kuda', 'Sterling Bank'
];

export function computeTrustScore(v: Partial<VendorProfile>): number {
  let score = 0;
  if (v.phone_verified) score += 10;
  if (v.account_name) score += 20;
  if (v.social_verified) score += 15;
  if (v.student_verified) score += 15;
  if ((v.completed_orders ?? 0) > 0) score += 20;
  if ((v.positive_reviews ?? 0) > 0) score += 20;
  return Math.min(score, 100);
}

export function getVendorLevel(score: number): VendorLevel {
  if (score >= 80) return 'Top Vendor';
  if (score >= 55) return 'Trusted Vendor';
  if (score >= 30) return 'Verified Seller';
  return 'New Seller';
}

export const LEVEL_COLORS: Record<VendorLevel, string> = {
  'New Seller': 'bg-surface-container-high text-on-surface-variant',
  'Verified Seller': 'bg-primary/10 text-primary',
  'Trusted Vendor': 'bg-secondary/20 text-primary',
  'Top Vendor': 'bg-secondary text-primary',
};
