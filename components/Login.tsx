import React, { useState } from 'react';
import { 
  Eye, 
  EyeSlash, 
  Plus,
  Globe,
  EnvelopeSimple,
  LockSimple
} from '@phosphor-icons/react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-white overflow-hidden relative">
      {/* Top Right Icons */}
      <div className="absolute top-6 right-8 flex items-center gap-4 text-[#374151]">
         <Plus size={18} weight="bold" />
         <Globe size={18} />
         <div className="text-[18px] leading-none">🇬🇧</div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[480px] flex flex-col items-center">
          {/* Logo */}
          <div className="mb-3">
            <img src="https://i.ibb.co/99RKpWNq/Color-Black.png" alt="Kletta" className="h-10 w-auto" />
          </div>

          {/* Title */}
          <h1 className="text-[15px] font-medium text-[#000000] mb-6">Log in to your Kletta account</h1>

          {/* Login Content Area */}
          <div className="w-full p-6 flex flex-col">
            <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="w-full space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#000000]">Email</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]">
                  <EnvelopeSimple size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email" 
                  className="w-full h-[48px] pl-11 pr-4 rounded-[8px] border border-[#B5B5B5] text-[14px] font-medium text-black focus:border-[#005A66] focus:border-2 focus:shadow-[0_0_0_3px_rgba(0,90,102,0.20)] outline-none transition-all placeholder:text-[#B5B5B5]" 
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#000000]">Password</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]">
                  <LockSimple size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="Enter your password" 
                  className="w-full h-[48px] pl-11 pr-12 rounded-[8px] border border-[#B5B5B5] text-[14px] font-medium text-black focus:border-[#005A66] focus:border-2 focus:shadow-[0_0_0_3px_rgba(0,90,102,0.20)] outline-none transition-all placeholder:text-[#B5B5B5]" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#000000] transition-colors"
                >
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div 
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-5 h-5 rounded-[4px] flex items-center justify-center border transition-all ${rememberMe ? 'bg-[#005F6B] border-[#005F6B]' : 'border-[#B5B5B5] bg-white'}`}
                >
                  {rememberMe && <div className="w-2.5 h-2.5 bg-white rounded-[1px]"></div>}
                </div>
                <span className="text-[13px] font-medium text-black select-none">Remember me</span>
              </label>
              <button type="button" className="text-[13px] font-bold text-[#005F6B] hover:underline transition-colors">
                Forgot password
              </button>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              className="w-full bg-[#005F6B] hover:bg-[#004D57] text-white h-[48px] rounded-[8px] font-bold text-[16px] transition-all shadow-[0_4px_0_rgba(0,0,0,0.1)] mt-2 flex items-center justify-center transform active:translate-y-[2px] active:shadow-none"
            >
              Login
            </button>

            {/* Separator */}
            <div className="relative flex items-center py-3">
              <div className="flex-grow border-t border-[#B5B5B5]"></div>
              <span className="flex-shrink mx-4 text-[13px] text-black font-medium">or continue</span>
              <div className="flex-grow border-t border-[#B5B5B5]"></div>
            </div>

            {/* Suomi.fi Button */}
            <button 
              type="button"
              className="w-full bg-[#FFDD33] hover:bg-[#FACC15] text-[#000000] h-[48px] rounded-[8px] font-bold text-[15px] transition-all flex items-center justify-center gap-2.5 shadow-sm"
            >
              <span className="text-[18px]">🇫🇮</span>
              Suomi.fi authentication
            </button>

            {/* Sign Up Footer */}
            <div className="pt-3 text-center">
              <p className="text-[14px] text-[#000000] font-medium">
                Don't have an account? <button className="text-[#005F6B] font-bold hover:underline">Sign up</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
};

export default LoginScreen;
