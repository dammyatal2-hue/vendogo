import { useState } from 'react';
import { Screen } from '../App';
import { MapPin, Eye, EyeOff, ChevronRight, MessageCircle } from 'lucide-react';

export const Login = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('marketplace');
  };

  return (
    <div className="min-h-screen pt-20 pb-32 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">

        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            <MapPin className="w-7 h-7 text-secondary" />
          </div>
          <h1 className="text-3xl font-display font-bold text-primary">Welcome back</h1>
          <p className="text-on-surface-variant text-sm">Sign in to your VendoGo account</p>
        </div>

        {/* Card */}
        <div className="bg-surface-container-lowest rounded-[32px] shadow-ambient border border-outline-variant/20 p-8 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary ml-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-bold text-primary">Password</label>
                <button type="button" className="text-xs font-bold text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full h-14 text-base shadow-lg shadow-primary/20 mt-2">
              Sign In <ChevronRight className="w-5 h-5" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-outline-variant/30" />
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-outline-variant/30" />
          </div>

          {/* WhatsApp login */}
          <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-sm transition-colors">
            <MessageCircle className="w-4 h-4" /> Continue with WhatsApp
          </button>
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm text-on-surface-variant">
          Don't have an account?{' '}
          <button onClick={() => onNavigate('client-onboarding')} className="font-bold text-primary hover:underline">
            Create one
          </button>
        </p>
      </div>
    </div>
  );
};
